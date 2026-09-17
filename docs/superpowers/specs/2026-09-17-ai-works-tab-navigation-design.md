# AI Works Tab Navigation Design

## Goal

Replace long, sequential video-category scrolling with a compact two-level tab interface and simplify the primary section headings.

## Approved Headings

The following headings use the same English text in both Korean and English language modes:

- Capability hero: `Works`
- Selected case studies: `Works`
- Image direction: `Images`
- Writing systems: `Beyond voice`
- Video collection: `Video`

Supporting paragraphs, filters, project descriptions, and metadata remain localized.

## Video Tabs

The Video section renders only one selected collection at a time.

### Primary tabs

- `Ads` — selected by default and displays the 7 advertising works.
- `Character IP` — displays the secondary character tabs.

### Character IP subtabs

- `Yena` — selected by default when Character IP is first opened and displays 14 works.
- `Gia & Yoonjae` — displays 11 works.

Primary and secondary tabs use the same restrained editorial treatment: a horizontal row, thin borders, black active state, and visible work counts. They do not change the URL and do not create new routes.

## Interaction

- Switching a tab replaces the card grid instead of appending another grid below it.
- Switching away from Character IP preserves the most recently selected character subtab during the current page session.
- The existing top-level capability filters remain unchanged.
- Selecting the top-level `Character IP` filter opens the Video section with `Character IP` active.
- Selecting `All` or `Video` uses `Ads` as the initial primary Video tab unless the visitor has already made a selection in the current page session.
- `Featured` continues to show its selected four-work grid without the Ads/Character IP tabs.
- Existing cards, hover previews, animations, media, and detail routes are preserved.

## Data and Error Handling

- Existing `galleryCategory` values remain the source of truth.
- No work records or assets are modified.
- Empty groups are not expected; if one occurs, the tab remains visible with a zero count and the grid renders empty without an application error.

## Verification

- Confirm all four requested headings in both language modes.
- Confirm the Video section initially shows only the 7 Ads.
- Confirm Character IP opens Yena by default, then switches between 14 Yena and 11 Gia & Yoonjae cards.
- Confirm the top-level Character IP filter activates the same character tab interface.
- Confirm no Ads and Character IP grids appear consecutively on the page.
- Run the production build and inspect desktop and narrow layouts.
