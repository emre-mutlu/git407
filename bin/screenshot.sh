#!/usr/bin/env bash
# ==========================================================================
# screenshot.sh — per-deck contact sheet (build-less, headless Chrome)
# ==========================================================================
# Renders ALL slides of each deck into one scaled CSS grid via _capture.html
# (which reuses the live engine, so thumbnails match the real presentation),
# then takes a single full-page headless-Chrome screenshot. No montage tool,
# no automation lib, no deep-link needed — CSS is the grid, Chrome is the
# camera. Output → <repo>/_contact/contact-<week>.png (gitignored).
#
#   bin/screenshot.sh                 # all decks in THIS repo
#   bin/screenshot.sh week1           # only week1
#   bin/screenshot.sh ../git423-ders  # sibling repo, all decks
#   CHROME="/path/to/chrome" bin/screenshot.sh   # override Chrome binary
# ==========================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO="$ROOT"; ONLY=""
for a in "$@"; do
  case "$a" in
    --*) ;;
    *) if [ -d "$a" ]; then REPO="$(cd "$a" && pwd)"; else ONLY="$a"; fi ;;
  esac
done

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
[ -x "$CHROME" ]                  || { echo "✗ Chrome bulunamadı: $CHROME (CHROME=... ile ver)" >&2; exit 2; }
[ -f "$REPO/weeks/manifest.js" ]  || { echo "✗ $REPO/weeks/manifest.js yok (doğru repo mu?)" >&2; exit 2; }

# harness lives canonically in git407; for a sibling repo copy it in temporarily
HARNESS="$REPO/_capture.html"; TEMP_HARNESS=0
if [ ! -f "$HARNESS" ]; then
  [ -f "$ROOT/_capture.html" ] || { echo "✗ _capture.html yok ($REPO ve $ROOT)" >&2; exit 2; }
  cp "$ROOT/_capture.html" "$HARNESS"; TEMP_HARNESS=1
fi

OUT="$REPO/_contact"; mkdir -p "$OUT"
PORT=8799
SRV=""
cleanup(){ [ -n "$SRV" ] && kill "$SRV" 2>/dev/null || true; [ "$TEMP_HARNESS" = 1 ] && rm -f "$HARNESS"; }
trap cleanup EXIT

# serve the repo (ES modules need http, not file://)
( cd "$REPO" && exec python3 -m http.server "$PORT" ) >/dev/null 2>&1 &
SRV=$!
for _ in $(seq 1 40); do curl -fs "http://localhost:$PORT/weeks/manifest.js" >/dev/null 2>&1 && break; sleep 0.15; done

# deck key + slide count via the same ESM import the engine uses
COUNTS="$(cd "$REPO" && node --input-type=module -e '
import { manifest } from "./weeks/manifest.js";
for (const d of manifest) {
  const m = await import("./weeks/" + d.key + ".js");
  console.log(d.key, (m[d.key] && m[d.key].slides ? m[d.key].slides.length : 0));
}')"

n=0
while read -r KEY N; do
  [ -z "$KEY" ] && continue
  [ -n "$ONLY" ] && [ "$KEY" != "$ONLY" ] && continue
  COLS=3
  ROWS=$(( (N + COLS - 1) / COLS ))
  H=$(( 170 + ROWS * 290 ))                      # header + per-row (thumb+cap+gap)
  printf '▸ %-8s %2s slayt → grid %d×%d (1320×%d)\n' "$KEY" "$N" "$COLS" "$ROWS" "$H"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb \
    --virtual-time-budget=8000 --window-size="1320,$H" \
    --screenshot="$OUT/contact-$KEY.png" \
    "http://localhost:$PORT/_capture.html?week=$KEY" >/dev/null 2>&1
  if [ -f "$OUT/contact-$KEY.png" ]; then
    echo "  ✓ $OUT/contact-$KEY.png ($(du -h "$OUT/contact-$KEY.png" | cut -f1))"
    n=$((n+1))
  else
    echo "  ✗ üretilemedi: $KEY" >&2
  fi
done <<< "$COUNTS"

echo "✓ $n kontak föyü → $OUT/"
