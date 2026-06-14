#!/usr/bin/env bash
# ==========================================================================
# pdf.sh — per-deck printable PDF handout (build-less, headless Chrome)
# ==========================================================================
# A distributable handout (students who missed class / want the deck as a
# source). Build-less: no montage tool, no automation lib, no live @media print.
#
# HOW (and why this shape): the engine's responsive vw-based fonts render TALLER
# in Chrome's print media and overflow → clip, and `beforeprint` does NOT fire
# under headless --print-to-pdf, so we can't re-fit in print context. So instead
# we render _print.html in SCREEN media (where scale-to-fit is correct), capture
# each slide as a 1280x720 image, then assemble those fixed-size images into a
# PDF (images are immune to print reflow). Output matches the live presentation.
#   1. screenshot _print.html?strip in chunks of 16 slides (beats Chrome's
#      ~16k px screenshot-height cap on long decks),
#   2. lay the captured strips out as one background-image per page in asm.html,
#   3. --print-to-pdf that → <repo>/_pdf/deck-<week>.pdf (gitignored).
#
#   bin/pdf.sh                 # all decks in THIS repo
#   bin/pdf.sh week1           # only week1
#   bin/pdf.sh ../git423-ders  # sibling repo, all decks
#   CHROME="/path/to/chrome" bin/pdf.sh   # override Chrome binary
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
HARNESS="$REPO/_print.html"; TEMP_HARNESS=0
if [ ! -f "$HARNESS" ]; then
  [ -f "$ROOT/_print.html" ] || { echo "✗ _print.html yok ($REPO ve $ROOT)" >&2; exit 2; }
  cp "$ROOT/_print.html" "$HARNESS"; TEMP_HARNESS=1
fi

OUT="$REPO/_pdf"; mkdir -p "$OUT"
PORT=8798                          # 8799 = screenshot.sh; keep distinct
SIZE=16                            # slides per capture chunk (< ~16k px / 720)
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
  [ "$N" -gt 0 ] 2>/dev/null || { echo "  ✗ $KEY: slayt yok" >&2; continue; }

  CHUNKS=$(( (N + SIZE - 1) / SIZE ))
  T="$OUT/.tmp-$KEY"; rm -rf "$T"; mkdir -p "$T"
  printf '▸ %-8s %2s slayt → %d chunk\n' "$KEY" "$N" "$CHUNKS"

  # 1) capture each chunk as one tall strip PNG (screen media → correct fit)
  ok=1
  for c in $(seq 0 $((CHUNKS - 1))); do
    nc=$(( N - c * SIZE )); [ "$nc" -gt "$SIZE" ] && nc=$SIZE
    H=$(( nc * 720 ))
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb \
      --virtual-time-budget=10000 --window-size="1280,$H" \
      --screenshot="$T/s-$c.png" \
      "http://localhost:$PORT/_print.html?week=$KEY&strip=1&chunk=$c&size=$SIZE" >/dev/null 2>&1
    [ -f "$T/s-$c.png" ] || { echo "  ✗ chunk $c capture başarısız" >&2; ok=0; break; }
  done
  [ "$ok" = 1 ] || { rm -rf "$T"; continue; }

  # 2) assemble: one background-image page per slide (fixed size → print-safe)
  ASM="$T/asm.html"
  {
    echo '<!doctype html><meta charset="utf-8"><style>'
    echo '@page{size:1280px 720px;margin:0}*{margin:0;padding:0}'
    echo '.p{width:1280px;height:720px;overflow:hidden;background-repeat:no-repeat;background-size:1280px auto;-webkit-print-color-adjust:exact;print-color-adjust:exact;break-after:page;page-break-after:always}'
    echo '.p:last-child{break-after:auto;page-break-after:auto}'
    echo '</style>'
    for i in $(seq 0 $((N - 1))); do
      c=$(( i / SIZE )); off=$(( (i % SIZE) * 720 ))
      echo "<div class=\"p\" style=\"background-image:url(s-$c.png);background-position:0 -${off}px\"></div>"
    done
  } > "$ASM"

  # 3) print the fixed-size-image page to PDF
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --force-color-profile=srgb \
    --virtual-time-budget=5000 \
    --print-to-pdf="$OUT/deck-$KEY.pdf" \
    "http://localhost:$PORT/_pdf/.tmp-$KEY/asm.html" >/dev/null 2>&1

  rm -rf "$T"
  if [ -f "$OUT/deck-$KEY.pdf" ]; then
    echo "  ✓ $OUT/deck-$KEY.pdf ($(du -h "$OUT/deck-$KEY.pdf" | cut -f1))"
    n=$((n+1))
  else
    echo "  ✗ üretilemedi: $KEY" >&2
  fi
done <<< "$COUNTS"

echo "✓ $n PDF → $OUT/"
