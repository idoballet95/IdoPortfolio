# i.do Portfolio Language Toggle Design

## Goal

Add a site-wide English/Korean language control that keeps the portfolio English-first while preventing mixed-language body copy.

## Language behavior

- English is the default language on first visit.
- A compact `ENG / KOR` control appears in the top navigation on desktop and mobile.
- The selected language is stored in `localStorage` and restored on later visits.
- Major brand headings and proper work titles remain English: `AI Works`, `Sports Picks`, `i.do.picks`, and individual project titles.
- Supporting copy, navigation labels, filters, buttons, work descriptions, and work-detail production records switch languages.
- Naver Blog post titles and product names remain Korean because they identify the original published content and products.
- `AI works by i.do` is permanently changed to `AI Works`.

## Architecture

- Add a small language context with `language`, `setLanguage`, and a typed `t()` helper for shared interface copy.
- Extend each portfolio work with localized text fields for description, objective, process, challenge, and outcome. Existing English and Korean copy will be completed so both languages are always available.
- Keep Sports Picks product data unchanged; localize only the surrounding section copy, filters, disclosure labels, and buttons.
- Components read the selected language from the shared context rather than keeping independent state.

## Interface

- The active language is black and fully opaque; the inactive language is muted.
- The control uses the existing restrained navigation typography and does not introduce a new visual style.
- Switching language updates content immediately without navigation or reload.

## Failure handling

- Unknown or missing saved values fall back to English.
- If a localized field is missing, the component falls back to English rather than rendering blank content.
- Browser storage failures do not block language switching for the current session.

## Verification

- Verify first load is English.
- Verify `KOR` and `ENG` update all scoped content without mixed copy.
- Verify selection survives reload.
- Verify work gallery, work detail, Sports Picks, Contact, and mobile navigation.
- Run the production build after implementation.
