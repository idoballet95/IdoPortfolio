# Yena Image Curation Board

## Goal

Provide a private, local-only contact sheet for reviewing every Yena daily image plus relevant background, dashboard, and reference-sheet assets in one browser view.

## Source scope

- Scan `Yena Art History/yena-studio/episodes` at Vite startup.
- Include every supported image inside a `06_일상사진` directory.
- Include images outside those directories when their paths identify backgrounds, environments, locations, plates, dashboards, contact sheets, character sheets, or reference boards.
- Never copy, modify, or delete source files from the curation UI.

## Route and visibility

- Local route: `/curate/yena`.
- Do not add this route to the public portfolio navigation.
- If the local Yena source directory is missing, render an explanatory empty state.

## Review workflow

- Filter by category, episode, decision, or text search.
- Adjust desktop thumbnail density while keeping a usable mobile layout.
- Open any image in a focused review overlay.
- Mark an asset as `keep`, `exclude`, or `undecided`.
- In the overlay, `K`, `X`, and `U` apply the decision and move to the next image; arrow keys navigate without deciding.
- Store decisions in browser local storage and export all decided assets as JSON.
- Default to the undecided view so completed decisions leave the active queue.

## Visual direction

Use an editorial contact-sheet aesthetic consistent with the portfolio: ivory workspace, black utility header, acid-green keep state, coral exclude state, compact mono metadata, and a dense masonry wall that prioritizes the images.

## Performance

- Use native lazy image loading and asynchronous decoding.
- Render the first 160 filtered assets and load additional batches on demand.
- Serve original assets read-only through Vite's local filesystem allowlist, avoiding a large copied thumbnail archive in the repository.
