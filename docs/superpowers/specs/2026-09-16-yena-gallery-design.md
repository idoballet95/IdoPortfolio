# Yena Gallery and Final-Work Import Design

## Goal

Replace the `Experiments` gallery with a dedicated `Yena` gallery and project every verified Yena final master from the local Yena archive into the i.do.picks portfolio. Keep the change local; do not push or deploy.

## Gallery structure

The work page will expose four filters in this order:

1. `ADS`
2. `YOONJAE & GIA`
3. `YENA`
4. `ETC FOR FUN`

`Gia Pottery Class` moves from `Experiments` to `Yoonjae & Gia`. `Apocalypse Football` moves from `Experiments` to `Etc for Fun`. No `Experiments` category remains in the type or UI.

## Yena import manifest

Import these fourteen unique completed works, newest production date first:

| Slug | Public title | Final source | Duration |
| --- | --- | --- | --- |
| `yena-leeum-daily-vlog` | Day to Myself at Leeum | `leeum-daily-vlog-01/01_최종영상/YENA_LEEUM_IG_TEMPLATE_VO_MUSIC_v8.mp4` | 00:21 |
| `yena-judith-nail-vlog` | Nail with Klimt's Judith | approved 1080×1920 Instagram-template master | 00:15 |
| `yena-dali-jjimjilbang` | Dalí Is Melting at the Jjimjilbang | `dali-jjimjilbang-40s/01_최종영상/YENA_DALI_IG_TEMPLATE_FINAL_v4.mp4` | 00:40 |
| `yena-art-crowd-interview` | Yena at the Art Crowd | `art-crowd-interview-reel-01/01_최종영상/FULL_SUB.mp4` | 00:25 |
| `yena-art-history-came-alive` | Art History Came Alive | `art-crowd-01/01_최종영상/FINAL_MOTION_TRANSFER_UPSCALED_1440P.mp4` | 00:29 |
| `yena-hokusai-great-wave` | The Great Wave / Don't Press This Here… | `hokusai-blender-vlog-20260910/01_최종영상/FULL_SUB_YENA_IG.mp4` | 00:20 |
| `yena-roy-gallery-current` | The Current — Estelle Tcha & Katya Savel | `roy-gallery-current-01/01_최종영상/FULL_SUB.mp4` | 00:53 |
| `yena-magritte-kimbap` | This Is Not a Kimbap | `magritte-e11-01/01_최종영상/FULL_SUB.mp4` | verified from media |
| `yena-leonardo-handwriting` | Why Is Your Handwriting Backwards? | `leonardo-e2-01/01_최종영상/FULL_SUB.mp4` | 00:45 |
| `yena-munch-red-sky` | The Sky Actually Turned Red | `munch-e1-01/01_최종영상/FULL_SUB.mp4` | 00:45 |
| `yena-las-meninas` | Who Is Las Meninas Actually Painting? | `velazquez-e4-01/01_최종영상/FULL_SUB.mp4` | 00:45 |
| `yena-monet-h-mart` | Monet Followed Me Into H-Mart | `monet-e11-01/01_최종영상/FULL_SUB.mp4` | 00:45 |
| `yena-mona-lisa-stolen` | The Day the Mona Lisa Was Stolen — I Stood Next to the Thief | `da-vinci-e4-01/01_최종영상/FULL_SUB.mp4` | 01:00 |
| `yena-mona-lisa-eyebrows` | I Asked Da Vinci Why the Mona Lisa Has No Eyebrows | `da-vinci-e2-01/01_최종영상/FULL_SUB.mp4` | 01:00 |

The Judith landscape version is a related delivery version, not a second work. The approved vertical Instagram-template master is the portfolio source.

## Metadata and localization

Each imported work will receive the complete existing `PortfolioWork` shape: title, eyebrow, `Character` category, `Yena` gallery category, year, concise public description, duration, role, tools, objective, process, challenge, and outcome. English and Korean copy will be added to `work-copy.ts`.

Copy must be grounded in the episode's `PUBLISH.json`, `ARCHIVE.md`, `CAPTION.md`, status history, and existing CMDS record. Unknown production facts will remain generic rather than attributing an unverified model, client, result, or rightsholder. None of the Yena works will be featured in this batch, so the home-page featured selection remains unchanged.

## Media handling

For every entry:

1. Resolve the canonical source and confirm the file exists.
2. Verify codec, resolution, frame rate, duration, audio, and readability with `ffprobe`.
3. Generate a web delivery copy in `public/media/<slug>.mp4` without modifying the source master.
4. Generate `public/media/<slug>.jpg` from a representative clean frame.
5. Keep one portfolio entry per work and reject previews, archived alternates, and duplicate aspect-ratio deliveries.

Media preparation will use the repository's existing `prepare_media.py` dry-run/apply workflow where compatible. Any incompatible input will stop that item instead of silently substituting another file.

## CMDS projection

Reuse existing Yena content IDs where present. Create or update one published-work record per imported work and add it to the Published Content Index. Record source path, hash, verified media facts, website paths, and local publication state. Do not create metrics, canon, rights, or reusable-prompt claims without evidence.

## Validation and failure behavior

- Run `npm run build` and `git diff --check`.
- Verify all fourteen slug routes, local video responses, poster responses, filter counts, and category routing.
- Inspect the `/work` gallery in the local browser at desktop and mobile widths.
- If any canonical master fails verification or lacks enough factual metadata, leave that work unimported and report it explicitly.
- Keep unrelated repository changes out of the scoped commit.
- Do not push `main` or trigger a Vercel deployment.

## Expected result

The local work page has four clear creative groupings, the Yena tab contains all fourteen verified final works, existing Gia and experimental work remains accessible under the agreed categories, and each imported detail page has complete bilingual copy and playable local media.
