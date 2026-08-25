# i.do Character Hero Design

## Goal

Replace the current stock-photo Hero with a clean, modern 3D animation scene that represents i.do as an AI creator with a strong sports identity.

## Character

- Use `/Users/irenedo/Desktop/Characters/IDo animation/ido character sheet.png` as the identity reference.
- Preserve the character's recognizable face, large brown eyes, brown high ponytail, and pink headband.
- Change the football kit to modern athleisure: a cream zip-up top, black wide-leg pants, and restrained pink accents.
- Keep the polished stylized 3D animation rendering of the reference sheet.

## Scene

- The character works at a modern desk on AI video editing displayed on a large monitor.
- Place the character and workstation primarily on the right side.
- Preserve generous negative space on the left for the website's `i.do` title.
- Add subtle sports storytelling through a football, football boots, a small tactics board, and a trophy.
- Use graphic circular and geometric forms rather than a literal sports stadium.

## Art Direction

- Bright, clean Graphic Sports Pop with a premium editorial finish.
- Palette: warm cream, lime, cobalt blue, pink, black, and white.
- Avoid visual clutter, childish toy-room styling, photorealism, dark cyberpunk lighting, and embedded text or logos.
- The image itself must contain no typography because the live `i.do` heading remains in HTML.

## Composition and Responsiveness

- Generate a wide 16:9 master suitable for a full-viewport desktop Hero.
- Keep the character, face, monitor, and core desk setup inside a mobile-safe central-right region.
- Use CSS `object-fit: cover` with a responsive focal position so desktop and mobile crops retain the character.

## Interface Changes

- Remove the `Explore Works / 작품 보기` button.
- Keep the existing animated `i.do` heading and scroll indicator.
- Replace the remote Pexels Hero image with a local optimized asset.
- Add a descriptive alt text for the new scene.

## Verification

- Visually inspect desktop and mobile crops.
- Confirm the heading remains legible over the image.
- Confirm no control overlaps the character's face or monitor.
- Run the production build.
