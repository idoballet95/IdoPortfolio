# i.do Character Hero Design

## Goal

Replace the current stock-photo Hero with a clean, modern 3D animation scene that represents i.do as an AI creator with a strong sports identity.

## Character

- Use `/Users/irenedo/Desktop/Characters/IDo animation/ido character sheet.png` as the identity reference.
- Preserve the character's youthful childlike proportions and match the front-view character-sheet face exactly. Do not age her into an adult or reinterpret the visible eye area.
- Keep the thin pink headband unchanged.
- Replace the high ponytail with one neat French braid beginning at the crown and continuing down the back. Leave only a short loose tail at the end of the braid and secure it with a black hair tie.
- Dress her in a modern black Nike tracksuit: a black track jacket and matching pants, restrained white piping, and one small white Swoosh on the jacket.
- Keep the polished stylized 3D animation rendering of the reference sheet.

## Scene

- The character works at a modern desk behind an open silver MacBook. Place the laptop prominently in the foreground with its back facing the viewer, so no screen or editing interface is visible.
- Raise the MacBook so it fully hides the nose, cheeks, mouth, chin, and lower face. Show only both eyes in full, the eyebrows, and the forehead above the laptop edge.
- Treat the front-view face in the character sheet as the authoritative identity reference. Preserve its very round eye shape, large brown iris size, eye spacing, gentle eyebrow curves, broad youthful forehead, and innocent expression. Avoid sharper eyes, narrower eye spacing, visible cheek contours, or older facial proportions.
- Place the character and workstation primarily on the right side.
- Preserve generous negative space on the left for the website's `i.do` title.
- Add subtle sports storytelling through a football, a small tactics board, and a trophy. Place one neat pair of authentic pale blush satin ballet practice slippers beside the football: flexible low-profile soles, ballet-specific rounded toes, crossed instep elastics, and delicate ribbon details. They must not resemble ordinary fashion flats or pointe shoes. Do not include football boots.
- Remove the character's sneakers and show clean white ankle socks only.
- Remove the pen holder and black desk block. Replace both with one clean transparent plastic cup of iced Americano with visible coffee and ice, no logo or text.
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
- Add a thin responsive horizontal blank line immediately after `i.do` on the same visual baseline, evoking `i.do ________` as an open-ended fill-in-the-blank statement: “I can do anything.” The line contains no text and must remain delicate rather than decorative.
- Replace the remote Pexels Hero image with a local optimized asset.
- Add a descriptive alt text for the new scene.

## Image Quality

- The approved v7 source is 1672×941 and appears soft when enlarged across 2K and Retina displays.
- Create a non-destructive 2× master at 3344×1882 using high-quality Lanczos resampling with restrained sharpening.
- Use the high-resolution optimized asset as the website source while preserving the original v7 file.
- Avoid halos, oversharpened facial edges, color shifts, and excessive file weight.

## Verification

- Visually inspect desktop and mobile crops.
- Confirm the heading remains legible over the image.
- Confirm no interface control overlaps the character's visible eyes or MacBook.
- Run the production build.
- Confirm the Hero remains crisp at wide desktop viewport sizes.
