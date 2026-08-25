# Sports Picks Standalone Page Design

## Goal

Give `AI Works` and `Sports Picks` equal top-level navigation and provide a dedicated product-review archive inspired by the existing `i.do.picks` gallery layout.

## Navigation and routes

- Rename the top navigation item `Work` to `AI Works`.
- `AI Works` opens `/work`.
- `Sports Picks` opens `/sports-picks` instead of scrolling on the home page.
- `Contact` continues to return to and scroll within the home page.
- Preserve the global `ENG / KOR` control on every route.

## Home section

- Keep `Sports Picks` as a concise preview of the latest three visible products.
- Add a localized `Explore all picks` action that opens `/sports-picks`.
- Keep the large `Sports Picks` heading in English.

## Sports Picks page

- Use the same visual hierarchy as the work gallery: pale-green header region, large identity heading, summary, and category cards.
- Categories are All, Futsal, Running, Recovery, and Lifestyle.
- The selected category card is black; inactive cards are white.
- Place the filtered product-card grid on a white background below the header.
- Each product remains a white card containing its Naver thumbnail, original Korean product title, review link, and verified original product link.
- Supporting interface copy follows the global language selection; original post and product titles remain Korean.

## Data and behavior

- Reuse the existing `sportsPicks` dataset and filtering logic.
- The home preview and standalone page share the same card component to prevent visual drift.
- Hidden products remain excluded everywhere.

## Verification

- Verify both navigation routes, language persistence, category counts and filtering.
- Verify the home preview contains only three items.
- Verify all product and review links remain unchanged.
- Verify desktop and mobile layouts and run the production build.
