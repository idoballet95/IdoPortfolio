# AI Works Tab Navigation Implementation Plan

## Scope

Update four bilingual headings and replace the sequential Video taxonomy with primary and secondary in-page tabs. Preserve all project data, cards, media, filters, and detail routes.

## Steps

1. Change the capability hero and selected-case headings to `Works` in both language modes.
2. Change the image section heading to `Images` in both language modes.
3. Change the writing section heading to `Beyond voice` in both language modes.
4. Add primary Video tab state for `Ads` and `Character IP`, defaulting to Ads.
5. Add Character IP subtab state for `Yena` and `Gia & Yoonjae`, defaulting to Yena.
6. Replace sequential `VideoGroup` rendering with accessible tablists and one active `VideoGrid`.
7. Connect the page-level Character IP filter to the Character IP primary tab.
8. Preserve Featured as its existing four-work grid without nested tabs.
9. Verify counts, tab state, both languages, narrow layout, accessibility state, and the production build.

## Acceptance Criteria

- Both language modes display `Works`, `Works`, `Images`, and `Beyond voice` for the four requested headings.
- The Video section initially displays only 7 Ads.
- Character IP displays either 14 Yena or 11 Gia & Yoonjae works, never both at once.
- All tab buttons expose selected state and remain usable on narrow screens.
- Existing work detail navigation continues to function.
