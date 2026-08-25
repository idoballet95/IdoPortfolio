# Circular Filter Icons Design

## Scope

Change only the icon containers in the AI Works and Sports Picks category filters.

## Design

- Replace the current rounded-square icon backgrounds with perfect circles.
- Preserve the current container size, icon size, category colors, spacing, labels, counts, selected states, and filtering behavior.
- Apply the same circular shape consistently on desktop and mobile.

## Implementation

- In `WorkGallery.tsx`, change the category icon wrapper from `rounded-xl` to `rounded-full`.
- In `SportsPicksPage.tsx`, make the identical class change.

## Verification

- Run the production build.
- Confirm both filter groups render without layout shifts or TypeScript errors.
