# Navigation Contrast and i.do.eats Link Design

## Goal

Keep the fixed navigation legible over the detailed Hero image and connect the portfolio to the existing i.do.eats site.

## Navigation Surface

- Replace the transparent initial state with a translucent warm-cream surface.
- Apply backdrop blur so the Hero remains visible without reducing menu contrast.
- Add a very subtle bottom border.
- Increase surface opacity slightly after scrolling while retaining the existing subtle shadow.
- Keep black navigation text and existing active underlines.

## i.do.eats Link

- Add `i.do.eats ↗` as an external desktop navigation item.
- Link to the verified Netlify deployment: `https://idoeats.netlify.app`.
- Open in a new tab with safe `rel` attributes.
- Keep the link visually consistent with AI Works, Sports Picks, and Contact.
- Preserve responsive usability when the additional item reduces available width.

## Verification

- Confirm text remains legible across light and cobalt areas of the Hero.
- Confirm the external link returns HTTP 200 and opens in a new tab.
- Confirm mobile navigation does not overflow.
- Run the production build.
