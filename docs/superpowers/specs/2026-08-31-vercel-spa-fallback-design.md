# Vercel SPA Fallback Design

## Goal

Make direct portfolio detail URLs such as `/work/gia-pottery-class` return the Vite application instead of a Vercel 404, while preserving normal delivery of static media and prompt files.

## Chosen approach

Add a root `vercel.json` with a filesystem-first rewrite. Vercel checks for an existing static file before rewriting an unmatched request to `/index.html`. React Router then resolves the client-side route.

This is preferred over changing to hash-based URLs, which would alter every public URL, or generating a separate HTML file for every work, which would duplicate routing data and require ongoing synchronization.

## Scope

- Add one Vercel routing configuration file.
- Do not change React components, portfolio metadata, media, prompts, or existing slugs.
- Keep `/media/*`, `/prompts/*`, and other real build artifacts served directly.

## Validation

1. Run `npm run build` and `git diff --check`.
2. Confirm the scoped configuration diff.
3. Commit and push `main`.
4. Verify the matching Vercel deployment succeeds.
5. Confirm HTTP 200 for `/work/gia-pottery-class`, its video, poster, and prompt file.

## Failure handling

If Vercel rejects the configuration or static assets stop resolving directly, do not modify application routing. Revert only the new routing configuration and reassess the rewrite syntax.
