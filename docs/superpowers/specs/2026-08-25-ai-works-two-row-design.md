# AI Works Two-Row Preview Design

## Goal

Keep the homepage AI Works preview compact by preventing a third desktop row.

## Design

- Show only the first four featured works on the homepage.
- Preserve the current two-column desktop composition, producing exactly two rows.
- Preserve the single-column mobile layout, where the same four works stack vertically.
- Keep the current four-item order: Golden Ball — VR Chase, Only Pink in Sight, Nike Mercurial, and 2026 World Cup Edition.
- Keep all works in the data source and on the full `/work` gallery.
- Keep the `Explore all 11 projects` link and count unchanged.

## Implementation

- Limit the filtered `featured` collection to four items inside `AIWorks.tsx`.
- Do not change work metadata or featured flags.

## Verification

- Confirm the homepage shows four AI works only.
- Confirm desktop renders two rows and mobile renders four stacked cards.
- Confirm the full gallery still contains every project.
- Run the production build.
