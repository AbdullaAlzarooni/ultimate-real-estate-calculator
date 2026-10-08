#!/bin/bash
# The Ultimate Real Estate Calculator · © 2026 Abdulla Alzarooni. See LICENSE.
# Links every calculator in skills/ into ~/.claude/skills so Claude Code can use it.
# Safe to run again after `git pull` (adds new calculators, never overwrites your own folders).
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$HOME/.claude/skills"
for d in "$HERE"/skills/*/; do
  name="$(basename "$d")"; dest="$HOME/.claude/skills/$name"
  if [ -L "$dest" ]; then ln -sfn "${d%/}" "$dest"; echo "updated  $name"
  elif [ -e "$dest" ]; then echo "skipped  $name (a folder with this name already exists)"
  else ln -s "${d%/}" "$dest"; echo "added    $name"; fi
done
echo "Done. Start a new Claude Code session if a calculator doesn't show up."
