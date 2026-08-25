# i.do Character Hero Design

## Goal

Replace the current stock-photo Hero with a clean, modern 3D animation scene that represents i.do as an AI creator with a strong sports identity.

## Character

- Use `/Users/irenedo/Desktop/Characters/IDo animation/ido character sheet.png` as the identity reference.
- Preserve the character's youthful childlike proportions, recognizable face, large brown eyes, and brown high ponytail. Do not age her into an adult.
- Keep the headband clearly pink but thinner and more understated than before. Make the ponytail hair tie black.
- Dress her in a modern black Nike tracksuit: a black track jacket and matching pants, restrained white piping, and one small white Swoosh on the jacket.
- Keep the polished stylized 3D animation rendering of the reference sheet.

## Scene

- The character works at a modern desk behind an open silver MacBook. Place the laptop prominently in the foreground with its back facing the viewer, so no screen or editing interface is visible.
- Use the MacBook to hide the lower face from immediately below the nose. Show both eyes fully, plus her eyebrows, forehead, and complete small nose looking over the laptop edge.
- Treat the front-view face in the character sheet as the authoritative identity reference. Preserve its round eye shape, large brown iris size, gentle eyebrow curves, small rounded nose, broad forehead, soft cheek proportions, and friendly youthful expression. Avoid sharper eyes, narrower cheeks, or older facial proportions.
- Place the character and workstation primarily on the right side.
- Preserve generous negative space on the left for the website's `i.do` title.
- Add subtle sports storytelling through a football, a small tactics board, and a trophy. Place one neat pair of authentic pale blush satin ballet practice slippers beside the football: flexible low-profile soles, ballet-specific rounded toes, crossed instep elastics, and delicate ribbon details. They must not resemble ordinary fashion flats or pointe shoes. Do not include football boots.
- Remove the character's sneakers and show clean white ankle socks only.
- Use graphic circular and geometric forms rather than a literal sports stadium.

## Art Direction

- Bright, clean Graphic Sports Pop with a premium editorial finish.
- Palette: warm cream, cobalt blue, restrained lime, black, and white. Pink is reserved for the headband.
- Avoid visual clutter, childish toy-room styling, photorealism, dark cyberpunk lighting, and embedded text or logos.
- The image itself must contain no typography because the live `i.do` heading remains in HTML.

## Composition and Responsiveness

- Generate a wide 16:9 master suitable for a full-viewport desktop Hero.
- Keep the character's visible eyes, MacBook, and core desk setup inside a mobile-safe central-right region.
- Use CSS `object-fit: cover` with a responsive focal position so desktop and mobile crops retain the character.

## Interface Changes

- Remove the `Explore Works / 작품 보기` button.
- Keep the existing animated `i.do` heading and scroll indicator.
- Replace the remote Pexels Hero image with a local optimized asset.
- Add a descriptive alt text for the new scene.

## Verification

- Visually inspect desktop and mobile crops.
- Confirm the heading remains legible over the image.
- Confirm no interface control overlaps the character's visible eyes or MacBook.
- Run the production build.
