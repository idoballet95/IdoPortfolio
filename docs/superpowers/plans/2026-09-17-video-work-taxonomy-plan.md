# Video Work Taxonomy Implementation Plan

## Scope

Rework only the AI Works gallery taxonomy and the two requested headings. Preserve media, work data, detail routes, animations, and the editorial visual system.

## Steps

1. Update the featured section English heading from `Work that shows the decisions` to `work`.
2. Remove `Experiments` from the gallery filter controls.
3. Exclude `Etc for Fun` from every public gallery collection.
4. Replace the archive heading with the single title `Video` and remove the `ARCHIVE` kicker.
5. Derive `AD`, `Yena`, and `Gia & Yoonjae` arrays from `galleryCategory`.
6. Extract the existing animated video-card grid into a local reusable renderer.
7. Render `AD`, then `Character IP` with nested `Yena` and `Gia & Yoonjae` groups for `All` and `Video`.
8. Render only the two character groups for the `Character IP` filter and keep the compact selected grid for `Featured`.
9. Run asset/count checks, the production build, and browser verification in Korean and English.

## Acceptance Criteria

- No visible `ARCHIVE`, `Finished work`, or `Experiments` labels remain.
- The public video gallery contains 7 AD works, 14 Yena works, and 11 Gia & Yoonjae works.
- The single `Etc for Fun` work is absent from the gallery but its source record and route remain untouched.
- Every visible card still opens its existing detail page.
