#!/usr/bin/env python3
"""Fetch free election results for GitHub Pages deploy. Never replace valid data with a broken response."""
import json
import pathlib
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
TARGET = ROOT / "data" / "results.json"
URL = "https://thepeoplestally.com/data/results.json"


def main():
    request = urllib.request.Request(URL, headers={"User-Agent": "Midterms-2026-Dashboard/1.0 (+attribution: thepeoplestally.com)", "Accept": "application/json"})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            raw = response.read(20 * 1024 * 1024)
            payload = json.loads(raw)
        if not isinstance(payload, dict) or not isinstance(payload.get("races"), dict):
            raise ValueError("Expected JSON with a 'races' object")
        TARGET.parent.mkdir(parents=True, exist_ok=True)
        TARGET.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
        print(f"Wrote {TARGET.name}: {len(payload['races'])} races, source generated_at={payload.get('generated_at')}")
    except Exception as exc:
        print(f"WARNING: source unavailable ({exc}); keeping last verified snapshot.", file=sys.stderr)
        if not TARGET.exists():
            sys.exit(1)


if __name__ == "__main__":
    main()
