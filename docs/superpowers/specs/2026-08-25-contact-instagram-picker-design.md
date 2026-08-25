# Contact and Instagram Picker Design

## Goal

Replace the inactive subscription form with direct collaboration contact paths and working social links.

## Content

- Heading remains English in both language modes: `Get in Touch to Collaborate`.
- English description: `Interesting collaborations and projects are always welcome.`
- Korean description: `재미있는 협업과 프로젝트는 언제나 환영입니다.`

## Email

- Remove the visitor email input, send button, submission state, and subscription message.
- Display a Mail icon with `idoballet95@gmail.com` as the primary contact action.
- Link directly to `mailto:idoballet95@gmail.com`.

## Social Links

- Remove and archive the inactive YouTube link.
- Keep Instagram and Naver Blog.
- Link Naver Blog to `https://blog.naver.com/idohere`.
- Clicking Instagram opens an accessible compact chooser with two external links:
  - `i.do.eats` — `Food finds` / `맛집 기록` — `https://www.instagram.com/i.do.eats/`
  - `i.do.picks` — `Sports AI creatives` — `https://www.instagram.com/i.do.picks`
- Open external social links in a new tab with safe rel attributes.

## Interaction and Style

- Use a small polished popover/dialog rather than navigating immediately.
- Keep the section minimal, centered, and consistent with the portfolio's black, white, and pale-green visual system.
- Preserve the footer copyright.

## Verification

- Verify mailto, both Instagram links, and Naver Blog.
- Verify keyboard access and focus behavior for the Instagram chooser.
- Confirm no inactive `#` links remain.
- Run the production build.
