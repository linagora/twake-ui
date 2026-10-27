#!/usr/bin/env bash
# Generates SVGr React components from SVG files.
# Usage: npm run makeSvgr
#    or:  scripts/generate-svgr.sh [file-or-directory]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGE_DIR="$(dirname "$SCRIPT_DIR")"

# svgr-cli mangles absolute paths by prepending cwd, so we cd to package dir and use relative path
cd "$PACKAGE_DIR"
SVGR_TEMPLATE="scripts/svgr-template.cjs"
OUTPUT_DIR="$PACKAGE_DIR/src/Icons"
SVGR_BIN="$PACKAGE_DIR/../../node_modules/.bin/svgr"

mkdir -p "$OUTPUT_DIR"

streamEditor=$([[ $(uname -s) == "Linux" ]] && echo sed || echo gsed)

createSvgr() {
  svgFileFullPath="$1"
  svgFilename=$(basename "$svgFileFullPath")
  # Convert kebab-case.svg to PascalCase.tsx: cross.svg → Cross.tsx
  tsxFilename=$(echo "$svgFilename" | $streamEditor -E 's/^([a-z])/\U\1/g; s/-([a-z])/\U\1/g; s/svg$/tsx/g')
  tsxFileFullPath="$OUTPUT_DIR/$tsxFilename"

  echo "Generating: $tsxFilename"

  # svgo strips role from the SVG source, so pass it here
  extraProps=()
  if [ "$svgFilename" = "spinner.svg" ]; then
    extraProps=(--svg-props role=progressbar --svg-props aria-busy=true)
  fi

  "$SVGR_BIN" "$svgFileFullPath" \
    --typescript \
    --no-dimensions \
    --svg-props 'ref={iconRef}' \
    ${extraProps[@]+"${extraProps[@]}"} \
    --template "$SVGR_TEMPLATE" > "$tsxFileFullPath"
}

if [ -n "${1:-}" ]; then
  if [ -d "$1" ]; then
    # Directory mode: recursively find all SVGs (including subdirectories)
    find "$1" -name "*.svg" -print0 | while IFS= read -r -d '' i; do
      createSvgr "$i"
    done
  else
    # Single file mode
    createSvgr "$1"
  fi
else
  # Default: recursively process all SVGs in assets/ (skip animated — CSS keyframes break SVGr)
  for category in ui illus; do
    if [ -d "$PACKAGE_DIR/assets/$category" ]; then
      find "$PACKAGE_DIR/assets/$category" -name "*.svg" -print0 | while IFS= read -r -d '' i; do
        createSvgr "$i"
      done
    fi
  done
fi

echo "Done. Generated files are in $OUTPUT_DIR/"
