# Explicit Gallery Categories Design

## Goal

Require every portfolio work to declare its gallery category when it is registered, eliminating slug-based category lists and ensuring new videos never appear only under `All` by accident.

## Public categories

The gallery keeps four visible filters:

- `ALL`
- `ADS`
- `YOONJAE & GIA`
- `EXPERIMENTS`

The stored category values are `Ads`, `Yoonjae & Gia`, and `Experiments`. `All` remains a computed filter rather than a value assigned to a work.

## Data model

Add a required `galleryCategory` field to `PortfolioWork`:

```ts
type GalleryCategory = "Ads" | "Yoonjae & Gia" | "Experiments";
```

Keep the existing `category` field unchanged because it describes the work on detail and metadata surfaces. `galleryCategory` controls only the public gallery filter.

Every existing work receives an explicit value. Gia's pottery-class work is assigned to `Experiments` as requested. Existing commercial works remain in `Ads`; existing character-led Yoonjae and Gia works remain in `Yoonjae & Gia`; the existing apocalypse experiment remains in `Experiments`.

## Gallery behavior

Replace slug arrays in `WorkGallery.tsx` with equality checks against `work.galleryCategory`. Counts and filtered results use the same field so they cannot diverge.

Adding a future work without `galleryCategory` fails TypeScript validation during the production build, making category selection part of the registration workflow.

## Validation

1. Run the production build and TypeScript transformation.
2. Confirm `gia-pottery-class` appears in `Experiments` and not `Yoonjae & Gia`.
3. Confirm every work has exactly one explicit gallery category.
4. Verify category counts and filtered slugs with a targeted data check.
5. Run `git diff --check`, commit scoped files, push `main`, verify the matching Vercel deployment, and confirm the live gallery and Gia route return HTTP 200.

## Scope

No media, prompts, localized copy, detailed work metadata, or route structure changes. No multi-category tagging is introduced.
