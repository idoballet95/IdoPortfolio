# Video Work Taxonomy Design

## Goal

Simplify the AI Works copy and reorganize the public video archive so recruiters can distinguish advertising work from recurring character IP at a glance.

## Approved Copy Changes

- Change `Work that shows the decisions` to `work` in English.
- Remove the `ARCHIVE` kicker above the video collection.
- Change `Finished work` to `Video` in English and Korean.

## Public Video Structure

The Video section uses one continuous page with visible headings rather than separate routes.

1. `AD`
   - Contains every work whose `galleryCategory` is `Ads`.
2. `Character IP`
   - `Yena`: contains every work whose `galleryCategory` is `Yena`.
   - `Gia & Yoonjae`: contains every work whose `galleryCategory` is `Yoonjae & Gia`.

Works whose `galleryCategory` is `Etc for Fun` are omitted from the public gallery and its filters. Their data and detail routes remain intact so no source material is deleted.

## Interaction and Layout

- Preserve the existing video cards, hover previews, motion and detail-page navigation.
- Display the three card grids in the order `AD`, `Yena`, `Gia & Yoonjae`.
- Keep `Character IP` as the parent heading for the two named character groups.
- Remove the redundant `Experiments` filter.
- Keep `All`, `Featured`, `Video`, `Image`, `Writing & Systems`, and `Character IP` filters.
- `All` and `Video` show the complete visible hierarchy.
- `Character IP` shows only the `Yena` and `Gia & Yoonjae` groups.
- `Featured` keeps the selected featured video grid without forcing the full taxonomy.

## Data and Implementation

- Reuse the existing `galleryCategory` field as the source of truth.
- Derive `ads`, `yena`, and `giaYoonjae` collections inside `WorkGallery`.
- Use a small reusable group renderer in `WorkGallery` so the card markup is not duplicated.
- No changes are required to `works.ts`, individual work records, media assets, or detail routes.

## Verification

- Confirm `Etc for Fun` does not appear in the gallery or filters.
- Confirm all 7 Ads, 14 Yena, and 11 Gia & Yoonjae works remain reachable.
- Confirm each card still opens its current detail route.
- Verify Korean and English labels and run the production build.
