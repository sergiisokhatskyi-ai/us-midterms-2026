#!/usr/bin/env python3
"""Refresh 2026 election counts and early-voting statistics for GitHub Pages.
Preserves last known valid snapshots if a source fails.
"""
import json
import pathlib
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
DATA.mkdir(exist_ok=True)

SOURCES = (
    ("results.json", "https://thepeoplestally.com/data/results.json"),
    ("live.json", "https://thepeoplestally.com/api/live"),
    ("early_votes.json", "https://thepeoplestally.com/data/early_votes.json"),
)

def is_valid(name, obj):
    if not isinstance(obj, dict):
        return False
    if name == "results.json":
        return isinstance(obj.get("races"), dict)
    if name == "early_votes.json":
        return isinstance(obj.get("national"), dict) and isinstance(obj.get("states"), dict)
    return (isinstance(obj.get("ev"), dict)
            and isinstance(obj["ev"].get("states"), dict)
            and isinstance(obj["ev"].get("national"), dict)
            and isinstance(obj.get("res"), dict))

def main():
    failures = 0
    for name, url in SOURCES:
        dst = DATA / name
        request = urllib.request.Request(url, headers={
            "User-Agent": "USMidtermsDashboard/1.1 (public research dashboard)",
            "Accept": "application/json",
        })
        try:
            with urllib.request.urlopen(request, timeout=28) as response:
                raw = response.read(20 * 1024 * 1024 + 1)
            if len(raw) > 20 * 1024 * 1024:
                raise ValueError("response exceeds 20 MB")
            payload = json.loads(raw)
            if not is_valid(name, payload):
                raise ValueError("unexpected JSON structure")
            temp = dst.with_suffix(".tmp")
            temp.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
            temp.replace(dst)
            if name == "results.json":
                detail = f"{len(payload['races'])} races"
            elif name == "live.json":
                detail = f"{payload['ev']['national'].get('total_ballots_cast', 0)} early ballots"
            else:
                detail = f"{payload['national'].get('total_ballots_cast', 0)} early ballots"
            print(f"OK {name}: {detail}")
        except Exception as exc:
            failures += 1
            print(f"WARNING {name}: {exc}; keeping prior snapshot", file=sys.stderr)
    if failures == len(SOURCES) and not all((DATA / name).exists() for name, _ in SOURCES):
        sys.exit("No valid election or early-voting data available")

if __name__ == "__main__":
    main()
