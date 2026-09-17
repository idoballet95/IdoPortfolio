# Yena Exact-Duplicate Consolidation

## Goal

Remove only byte-identical duplicate daily images from the local Yena curation board while preserving the user's existing review decisions. Source files remain untouched.

## Confirmed scope

- Deduplicate images inside `06_일상사진` directories only.
- The current source set contains 44 exact-duplicate groups and 54 redundant files.
- Do not automatically merge visually similar images with different file contents.
- Do not delete, move, rename, or edit any source image.

## Duplicate detection

1. Collect the same image candidates already used by the curation manifest.
2. Group daily-image candidates by byte size.
3. Compute a SHA-256 content hash only for size groups containing more than one file.
4. Treat files as duplicates only when their SHA-256 hashes match exactly.
5. Keep one canonical asset in the manifest and attach the hidden duplicate IDs to it.

This size-first pass avoids reading and hashing files that cannot possibly be identical.

## Canonical selection

Choose the cleanest source path deterministically:

1. Prefer a path outside packaged or nested duplicate folders such as `YENA_*`.
2. Prefer a path outside `_original-aspect` and archive-like directories when an identical primary output exists.
3. Prefer the shortest relative path.
4. Use Korean locale-aware path order as the final tie-breaker.

The same file remains canonical across restarts as long as the source tree is unchanged.

## Decision preservation

- Each canonical asset carries all hidden duplicate IDs as aliases.
- When loading existing browser decisions, resolve the whole duplicate group together.
- If any alias is marked `keep`, the canonical image is `keep`.
- Otherwise, if any alias is marked `exclude`, the canonical image is `exclude`.
- Otherwise the canonical image remains `undecided`.
- A new decision on the canonical image updates the canonical ID and every alias, preventing old alias decisions from reappearing.

`keep` takes precedence over `exclude` so a deliberately retained copy is never lost during consolidation.

## UI behavior

- The board shows one card per exact duplicate group.
- Category and decision counts use the consolidated asset list.
- Add a compact header note showing how many redundant exact duplicates were hidden.
- Exported decisions include the canonical path and its duplicate paths for traceability.

Expected total after this change: 769 visible assets, assuming the current 823-asset source set remains unchanged.

## Verification

- Confirm the manifest reports 44 groups and 54 hidden duplicate files.
- Confirm the visible total changes from 823 to 769.
- Confirm every retained canonical file exists and loads through the local Vite server.
- Confirm existing decisions attached to duplicate aliases appear on the canonical card.
- Confirm changing a canonical decision updates its aliases.
- Run the production build and inspect the curation route in the browser.
