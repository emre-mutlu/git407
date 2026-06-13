#!/usr/bin/env bash
# ==========================================================================
# sync-engine.sh — distribute the shared presentation engine
# ==========================================================================
# git407 is the canonical home of scripts/main.js (the engine). The sibling
# deck site git423 (local: ../git423-ders) runs a byte-identical copy. This
# script copies the engine git407 -> git423-ders and reports drift.
#
#   sync-engine.sh            # show diff, then copy if they differ (asks)
#   sync-engine.sh --check    # diff only, never write (exit 1 if drift) — CI/pre-push
#   sync-engine.sh --force    # copy without asking
#   sync-engine.sh <dest-repo># override target repo path
#
# Only the engine is shared. CSS, weeks/*, index.html, weeks/manifest.js are
# per-site and are NEVER touched here.
# ==========================================================================
set -euo pipefail

SRC_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$SRC_ROOT/scripts/main.js"

MODE="copy"
DEST_REPO="$SRC_ROOT/../git423-ders"
for arg in "$@"; do
  case "$arg" in
    --check) MODE="check" ;;
    --force) MODE="force" ;;
    -*)      echo "bilinmeyen seçenek: $arg" >&2; exit 2 ;;
    *)       DEST_REPO="$arg" ;;
  esac
done
DEST="$DEST_REPO/scripts/main.js"

[ -f "$SRC" ]  || { echo "✗ kaynak motor yok: $SRC" >&2; exit 2; }
[ -f "$DEST" ] || { echo "✗ hedef motor yok: $DEST (hedef repo doğru mu?)" >&2; exit 2; }

VER="$(grep -m1 "const ENGINE_VERSION" "$SRC" | sed -E "s/.*'([^']+)'.*/\1/")"

if diff -q "$SRC" "$DEST" >/dev/null 2>&1; then
  echo "✓ motor senkron (v${VER:-?}) — $DEST"
  exit 0
fi

echo "⚠ DRİFT: motor farklı (git407 v${VER:-?})"
echo "--- $DEST"
echo "+++ $SRC"
diff "$DEST" "$SRC" || true

if [ "$MODE" = "check" ]; then
  echo "→ --check: yazılmadı (drift var)." >&2
  exit 1
fi

if [ "$MODE" = "copy" ]; then
  printf "git423-ders'e kopyalansın mı? [y/N] "
  read -r ans
  case "$ans" in y|Y|yes|evet) ;; *) echo "iptal."; exit 0 ;; esac
fi

cp "$SRC" "$DEST"
echo "✓ kopyalandı → $DEST (v${VER:-?})"
echo "  not: git423-ders'i ayrıca commit + push et (push = canlı)."
