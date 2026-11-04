#!/usr/bin/env python3
"""Refresh real 2026 unofficial vote totals for the mobile GitHub Pages dashboard.

Primary: civicAPI-derived sitmap.live public JSON, 50-state coverage.
Fallback: Open America state-agency feeds, 22-state coverage.
Never overwrite a populated recent snapshot with an empty/stale/partial result.
"""
import datetime as dt
import json
import pathlib
import sys
import urllib.parse
import urllib.request

OUT = pathlib.Path(__file__).resolve().parents[1] / "data" / "results.json"
PRIMARY = "https://sitmap.live/api/elections/us-2026.json"
SECONDARY = "https://openamerica.io/elections/results.json?year=2026&office="
STATES = set("AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split())


def load(url):
    request = urllib.request.Request(url, headers={
        "Accept": "application/json",
        "Accept-Encoding": "identity",
        "User-Agent": "US-midterms-2026-mobile-dashboard/4.0 (public civicAPI/openamerica data)",
    })
    with urllib.request.urlopen(request, timeout=22) as response:
        payload = response.read(30 * 1024 * 1024 + 1)
    if len(payload) > 30 * 1024 * 1024:
        raise ValueError("Too large")
    return json.loads(payload)


def party(candidate):
    value = str(candidate.get("group") or candidate.get("party") or candidate.get("p") or "").lower()
    if value in ("dem", "d") or value.startswith("democrat"):
        return "D"
    if value in ("rep", "r") or value.startswith("republican"):
        return "R"
    return "O"


def normalize_sitmap(data):
    if not isinstance(data, dict) or data.get("election", {}).get("id") != "us-2026":
        raise ValueError("Not the 2026 election")
    contests = data.get("contests")
    if not isinstance(contests, list):
        raise ValueError("Missing contest list")
    races = {}
    with_votes = 0
    latest = None
    for entry in contests:
        office = entry.get("chamber")
        st = str(entry.get("jurisdiction", {}).get("state") or "").upper()
        if office not in ("senate", "house", "governor") or st not in STATES:
            continue
        key = {"senate": "S", "house": "H", "governor": "G"}[office] + "-" + st
        if office == "house":
            district = entry.get("jurisdiction", {}).get("district")
            if district is None:
                district = str(entry.get("id", "")).split(":")[-1].split("-")[-1]
            district = str(district)
            if not district.isdigit():
                district = "00"
            key += "-" + district.zfill(2)
        elif entry.get("special"):
            key += "-sp"
        if key in races:
            continue
        called = entry.get("call") or {}
        winner_ids = {str(id) for id in (called.get("winners") or [])}
        candidates = []
        for candidate in entry.get("candidates") or []:
            try:
                votes = max(0, int(candidate.get("votes") or 0))
            except (TypeError, ValueError):
                votes = 0
            candidates.append({
                "name": str(candidate.get("name") or ""),
                "party": party(candidate),
                "votes": votes,
                "pct": candidate.get("pct"),
                "winner": bool(called) and str(candidate.get("id")) in winner_ids,
            })
        if sum(c["votes"] for c in candidates) > 0:
            with_votes += 1
        asof = entry.get("updatedAt")
        if asof and (latest is None or asof > latest):
            latest = asof
        races[key] = {
            "cands": candidates,
            "exp": entry.get("reportingPct"),
            "asof": asof,
            "status": "Called by civicAPI" if called else "Counting",
            "called_by": called.get("caller"),
            "url": "https://sitmap.live/elections/us-2026",
            "src": "civicAPI (Sitmap public JSON)",
        }
    if len(races) < 30 or with_votes < 20:
        raise ValueError(f"No credible live vote totals: {len(races)} races / {with_votes} with votes")
    return {
        "races": races,
        "generated_at": data.get("generatedAt") or latest or data.get("fetchedAt"),
        "source": "civicAPI (state election offices) via sitmap.live",
        "coverage": {
            "scope": "50 states",
            "races": len(races),
            "withVotes": with_votes,
            "source": "civicAPI via sitmap.live",
            "sourceUpdated": data.get("fetchedAt"),
            "called": data.get("counts", {}).get("called"),
        },
        "feed_status": "live",
        "api_version": 2,
    }


def normalize_openamerica(feeds):
    races = {}
    with_votes = 0
    latest = None
    for office, feed in feeds.items():
        if not isinstance(feed, dict) or feed.get("year") != 2026:
            continue
        for race_id, race in (feed.get("races") or {}).items():
            st = str(race_id)[:2].upper()
            if st not in STATES:
                continue
            base = {"senate": "S", "house": "H", "governor": "G"}[office] + "-" + st
            if office == "house":
                base += "-" + str(race_id).split("-")[-1].zfill(2)
            elif str(race_id).endswith("-special"):
                base += "-sp"
            cands = [{
                "name": c.get("n", ""), "party": party(c),
                "votes": int(c.get("v") or 0), "pct": c.get("pct"),
                "winner": False
            } for c in race.get("cands") or []]
            if sum(c["votes"] for c in cands) > 0:
                with_votes += 1
            asof = race.get("as_of")
            if asof and (latest is None or asof > latest):
                latest = asof
            races[base] = {
                "cands": cands,
                "exp": race.get("pct_in"),
                "asof": asof,
                "status": "Counting (not called)",
                "url": "https://openamerica.io/elections/api/",
                "src": "Official state election offices via Open America",
            }
    if not with_votes:
        raise ValueError("Open America has no vote totals")
    return {
        "races": races, "generated_at": latest,
        "source": "Official state election offices via Open America",
        "coverage": {"scope": "22 of 50 states", "races": len(races), "withVotes": with_votes},
        "feed_status": "partial", "api_version": 1
    }


def has_votes(document):
    return bool(document) and any(
        any(int(c.get("votes") or 0) > 0 for c in race.get("cands", []))
        for race in document.get("races", {}).values()
    )


def main():
    old = None
    if OUT.exists():
        try:
            old = json.loads(OUT.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            pass

    result = None
    errors = []
    try:
        result = normalize_sitmap(load(PRIMARY))
        print(f"SUCCESS civicAPI: {result['coverage']['races']} races; {result['coverage']['withVotes']} have votes.")
    except Exception as exc:
        errors.append(f"Sitmap: {exc}")
        print(f"WARNING civicAPI: {exc}", file=sys.stderr)

    if result is None:
        try:
            feedset = {}
            for office in ("senate", "house", "governor"):
                try:
                    feedset[office] = load(SECONDARY + urllib.parse.quote(office.title()))
                except Exception as exc:
                    print(f"WARNING Open America {office}: {exc}", file=sys.stderr)
            result = normalize_openamerica(feedset)
        except Exception as exc:
            errors.append(f"Open America: {exc}")

    if result and has_votes(result):
        # Do not replace wide 50-state counts with a partial backup if the primary is down.
        if old and has_votes(old) and old.get("feed_status") == "live" and result.get("feed_status") == "partial":
            print("WARNING: keeping prior 50-state snapshot instead of replacing with partial feed.")
            return
        OUT.parent.mkdir(parents=True, exist_ok=True)
        tmp = OUT.with_suffix(".tmp")
        tmp.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
        tmp.replace(OUT)
        print("WROTE", OUT.name, result["generated_at"])
    else:
        print("WARNING: No new valid vote totals; retaining last good snapshot.", errors, file=sys.stderr)


if __name__ == "__main__":
    main()
