# Sports Picks: Naver reviews + Coupang Partners sync

## Goal

Replace the static Sports Picks section with a catalogue built from the `용품` category of `blog.naver.com/idohere`. Each card uses the review cover and provides two destinations: `후기 보기` for Naver and `제품만 보기` for the matched Coupang Partners product. New reviews appear after sync without a React code change.

## Scope

The initial import covers all 19 current `용품` posts. Future syncs add and update posts. Local editorial overrides can hide or correct a card. The system does not publish to Naver or modify Coupang products.

## Architecture

```text
Naver Blog Search API + 용품 category index
                    ↓
             review normalizer
                    ↓
          cover/product extractor
                    ↓
          Coupang Partners search
                    ↓
        matcher + editorial overrides
                    ↓
          generated sports-picks.json
                    ↓
             public React section
```

The public site reads generated non-secret data. A server-side sync command owns every external API call; credentials never enter the browser bundle.

## Data sources

Use the official Naver Blog Search API for title, canonical link, description and date, filtering to `idohere`. Because it does not expose category membership or cover images, the public `용품` category index (`categoryNo=10`) is authoritative for inclusion, while each accepted post's Open Graph image (or first meaningful content image) supplies the cover.

Extract brand, model, product type and variant terms from each review, then query the Coupang Partners product API. Store the API-provided affiliate URL; do not manufacture tracking parameters in the client.

## Product matching

Score candidates from 0 to 100:

- exact model identifier: 35
- brand: 20
- core product name: 25
- product type: 10
- variant such as colour, size or capacity: 10

An 85+ match may be selected automatically. Anything lower remains unresolved until an override chooses the correct product. Saved overrides always win on later syncs. If no credible match exists, keep the review public but disable `제품만 보기` with `제품 링크 준비 중`; never link to a near-match.

## Data model

```ts
type SportsPick = {
  id: string; // Naver log number
  title: string;
  productName: string;
  brand?: string;
  summary: string;
  reviewUrl: string;
  productUrl?: string;
  coverImage: string;
  publishedAt: string;
  disclosure: "sponsored" | "affiliate" | "purchased" | "unknown";
  matchConfidence?: number;
  productId?: string;
  visible: boolean;
  order?: number;
  syncedAt: string;
};

type SportsPickOverride = {
  id: string;
  productId?: string;
  productUrl?: string;
  productName?: string;
  summary?: string;
  coverImage?: string;
  visible?: boolean;
  order?: number;
};
```

Generated API data and editorial overrides remain separate so refreshes cannot erase manual decisions.

## UI

Replace the oversized static feature with a responsive review grid.

- Heading: `Sports Picks`
- Intro: `직접 써보고 고른 운동용품 후기.`
- Filters: `전체`, `풋살`, `러닝`, `회복`, `라이프`
- Image: original Naver cover at a consistent 4:3 crop
- Metadata: disclosure, product name, short verdict and date
- Actions: `후기 보기` and `제품만 보기`

Links open in a new tab with `rel="noopener noreferrer"`. Affiliate disclosure appears above the grid and close to purchase actions.

## Sync workflow

1. Fetch every page of the Naver `용품` category.
2. Match Blog Search API records belonging to `idohere`.
3. Normalize titles, HTML entities, dates and canonical URLs.
4. Extract cover, disclosure and structured product terms.
5. Search Coupang Partners and score candidates.
6. Apply saved overrides.
7. Validate required fields and URLs.
8. Atomically replace the catalogue only after full validation.
9. Write a report of additions, updates, unresolved matches and failures.

Run manually during development and daily in hosting automation. A failed sync leaves the previous valid catalogue live.

## Secrets

Server-only environment variables:

- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`
- `COUPANG_ACCESS_KEY`
- `COUPANG_SECRET_KEY`
- optional Coupang channel/sub-ID supported by the account

Store them in local environment configuration and the host's secret store. Never commit them, prefix them with Vite client variables, log signed requests, or return them through public routes.

## Failure handling

- Naver unavailable: retain the last catalogue.
- Missing cover: use a branded fallback and flag the post.
- Coupang auth/rate failure: preserve existing matches and stop lookup.
- No credible product: disable the product action.
- Duplicate result: deduplicate by Naver log number.
- Removed/recategorized post: hide only after two consecutive successful syncs where it is absent.
- Invalid affiliate URL: disable it and report it.

## Testing

Unit tests cover title cleanup, product extraction, candidate scoring, disclosure detection, URL validation and override precedence. Fixture tests use representative API responses without live credentials. Integration tests verify atomic sync output with mocked services. UI tests cover filters, missing-product states, image fallback, external-link attributes and responsive layout.

Before release, run one authenticated dry run and visually review all 19 initial mappings.

## Acceptance criteria

- All 19 current `용품` reviews exist in the generated catalogue.
- Every card uses its post cover or an explicit fallback.
- Every card links to the correct Naver post.
- Correct Coupang matches show `제품만 보기`; unresolved items never link to a different product.
- Secrets are absent from the repository and client bundle.
- Failed syncs cannot corrupt the last valid catalogue.
- New `용품` posts can appear through sync without React edits.
