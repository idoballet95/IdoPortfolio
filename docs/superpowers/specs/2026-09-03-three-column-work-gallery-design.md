# Three-column work gallery design

## Goal

Keep the i.do.picks work gallery at three columns on desktop and wider screens so each card remains large enough to scan comfortably.

## Responsive behavior

- Mobile: one column.
- Small and medium screens: two columns.
- Large screens and above: three columns.
- Extra-large screens must not expand to four columns.

## Implementation

Remove the `xl:columns-4` override from the masonry container in `WorkGallery.tsx`. Retain the existing one-, two-, and three-column breakpoints, card proportions, spacing, filtering, animation, and hover behavior.

## Verification

- Run the production build.
- Confirm the gallery container resolves to three columns at extra-large viewport widths.
- Confirm mobile and tablet breakpoints remain unchanged.

## Scope

No changes to the category navigation grid, work data, media, detail pages, or publication state.
