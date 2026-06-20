#!/usr/bin/env bash
# ==========================================================================
# sync-engine.sh — distribute the shared presentation engine
# ==========================================================================
# git407 is the canonical home of the shared engine. The sibling deck site
# git423 (local: ../git423-ders) runs byte-identical copies. This script
# copies the shared files git407 -> git423-ders and reports drift.
#
#   sync-engine.sh            # show diff, then copy if they differ (asks)
#   sync-engine.sh --check    # diff only, never write (exit 1 if drift) — CI/pre-push
#   sync-engine.sh --force    # copy without asking
#   sync-engine.sh <dest-repo># override target repo path
#
# Shared (byte-identical) files: scripts/main.js + styles/engine.css.
# Everything else (main.css, weeks/*, index.html, manifest.js) is per-site
# and is NEVER touched here. Version stamp comes from ENGINE_VERSION in
# scripts/main.js; bump it whenever EITHER shared file changes.
# ==========================================================================
set -euo pipefail

SRC_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

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

# Shared files (repo-relative). Byte-identical across sites.
FILES=( "scripts/main.js" "styles/engine.css" )

VER="$(grep -m1 "const ENGINE_VERSION" "$SRC_ROOT/scripts/main.js" | sed -E "s/.*'([^']+)'.*/\1/")"

# Pass 1: detect drift across all shared files
drift=()
for f in "${FILES[@]}"; do
  SRC="$SRC_ROOT/$f"
  DEST="$DEST_REPO/$f"
  [ -f "$SRC" ] || { echo "✗ kaynak yok: $SRC" >&2; exit 2; }
  if [ ! -f "$DEST" ]; then
    echo "⚠ DRİFT: hedefte yok → $DEST"
    drift+=( "$f" )
  elif ! diff -q "$SRC" "$DEST" >/dev/null 2>&1; then
    echo "⚠ DRİFT: $f farklı (git407 v${VER:-?})"
    echo "--- $DEST"
    echo "+++ $SRC"
    diff "$DEST" "$SRC" || true
    drift+=( "$f" )
  fi
done

if [ "${#drift[@]}" -eq 0 ]; then
  echo "✓ motor senkron (v${VER:-?}) — $DEST_REPO"
  exit 0
fi

if [ "$MODE" = "check" ]; then
  echo "→ --check: yazılmadı (${#drift[@]} dosyada drift)." >&2
  exit 1
fi

if [ "$MODE" = "copy" ]; then
  printf "git423-ders'e kopyalansın mı (%d dosya)? [y/N] " "${#drift[@]}"
  read -r ans
  case "$ans" in y|Y|yes|evet) ;; *) echo "iptal."; exit 0 ;; esac
fi

# Pass 2: copy the drifted files
for f in "${drift[@]}"; do
  mkdir -p "$(dirname "$DEST_REPO/$f")"
  cp "$SRC_ROOT/$f" "$DEST_REPO/$f"
  echo "✓ kopyalandı → $DEST_REPO/$f (v${VER:-?})"
done
echo "  not: git423-ders'i ayrıca commit + push et (push = canlı)."
