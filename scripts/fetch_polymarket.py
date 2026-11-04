#!/usr/bin/env python3
"""Read-only Polymarket Gamma data snapshots; no invented or stale prices on source failure."""
import datetime
import json
import pathlib
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
TARGET = ROOT / "data" / "polymarket.json"
SLUGS = [
    "which-party-will-win-the-senate-in-2026",
    "which-party-will-win-the-house-in-2026",
    "balance-of-power-2026-midterms",
    "alaska-senate-election-winner",
    "iowa-senate-election-winner",
    "kansas-senate-election-winner",
    "maine-senate-election-winner",
    "michigan-senate-election-winner",
    "ohio-senate-election-winner",
    "texas-senate-election-winner",
    "arizona-governor-election-winner",
    "georgia-governor-election-winner",
    "nevada-governor-election-winner",
    "wisconsin-governor-election-winner",
]
FIELDS = ("id", "groupItemTitle", "question", "outcomes", "outcomePrices", "updatedAt", "closed", "active", "volumeNum")

def main():
    snapshot = {"fetched_at": None, "events": {}}
    if TARGET.exists():
        try:
            previous = json.loads(TARGET.read_text(encoding="utf-8"))
            if isinstance(previous.get("events"), dict):
                snapshot = previous
        except (OSError, ValueError, TypeError):
            pass
    successes = 0
    for slug in SLUGS:
        url = "https://gamma-api.polymarket.com/events/slug/" + urllib.parse.quote(slug)
        req = urllib.request.Request(url, headers={"User-Agent": "Midterms-Dashboard/2.0 (read-only educational dashboard)", "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                doc = json.load(resp)
            if doc.get("slug") != slug or not isinstance(doc.get("markets"), list) or not doc["markets"]:
                raise ValueError("Unexpected Gamma payload")
            markets = [{key: m.get(key) for key in FIELDS if key in m} for m in doc["markets"]]
            snapshot["events"][slug] = {"slug": slug, "title": doc.get("title"), "updatedAt": doc.get("updatedAt"), "closed": doc.get("closed"), "markets": markets}
            successes += 1
            print("Fetched", slug, len(markets), "outcomes")
        except Exception as exc:
            print("WARN", slug, type(exc).__name__, str(exc))
        time.sleep(0.1)
    if successes:
        snapshot["fetched_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        TARGET.parent.mkdir(parents=True, exist_ok=True)
        temp = TARGET.with_suffix(".tmp")
        temp.write_text(json.dumps(snapshot, separators=(",", ":"), ensure_ascii=False) + "\n", encoding="utf-8")
        temp.replace(TARGET)
    print("Polymarket:", successes, "of", len(SLUGS), "updated")

if __name__ == "__main__":
    main()
