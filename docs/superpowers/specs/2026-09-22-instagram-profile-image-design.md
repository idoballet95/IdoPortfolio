# Instagram Profile Image Design

## Goal

Create an Instagram profile image by cropping and resizing the current website hero image while preserving every source pixel and leaving the original hero asset unchanged.

## Source

- Edit target: `public/media/ido-hero-studio-v7-2x.png`
- Use the exact character appearance already rendered in this hero asset. Do not regenerate or retouch it.

## Composition

- Output: 1080×1080 PNG.
- Crop a 1400×1400 square from the source at crop offset Y=220, X=1700, then resize it to 1080×1080.
- Keep the woman and laptop exactly as they appear in the hero image, centered for Instagram's circular display mask.
- Do not remove, add, reconstruct, or repaint any subject, prop, background detail, text, logo, or border.

## Identity constraints

- No generative image editing.
- No retouching, reconstruction, inpainting, outpainting, or identity reinterpretation.
- Only deterministic crop and resize operations are allowed.

## Delivery

- Save non-destructively as `public/media/ido-instagram-profile-v1.png`.
- Inspect the full square for correct framing and dimensions; confirm that the woman's visible face remains centered in the circular profile area.
- Do not replace the website hero image or update website code in this task.
