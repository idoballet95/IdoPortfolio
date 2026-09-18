import fs from 'node:fs'
import { createHash } from 'node:crypto'
import { defineConfig, searchForWorkspaceRoot, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const YENA_EPISODES_ROOT = '/Users/irenedo/Documents/Yena Art History/yena-studio/episodes'
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'])

type CurationCategory = 'daily' | 'background' | 'sheet'

interface CurationAsset {
  id: string
  name: string
  episode: string
  collection: string
  category: CurationCategory
  relativePath: string
  url: string
  duplicateIds: string[]
}

interface CollectedAsset extends CurationAsset {
  absolutePath: string
  size: number
}

interface DuplicateSummary {
  groups: number
  hidden: number
}

function episodeFromRelativePath(relativePath: string) {
  const parts = relativePath.split(path.sep)
  return ['retired', '_hold'].includes(parts[0]) ? `${parts[0]}/${parts[1] ?? ''}` : parts[0]
}

function collectionFromRelativePath(relativePath: string) {
  const parts = relativePath.split(path.sep)
  const dailyIndex = parts.indexOf('06_일상사진')
  if (dailyIndex >= 0) return parts[dailyIndex + 1] || '06_일상사진'
  return parts.length > 2 ? parts[parts.length - 2] : parts[0]
}

function classifyAsset(relativePath: string): CurationCategory | null {
  const normalized = relativePath.toLowerCase()
  if (relativePath.includes(`${path.sep}06_일상사진${path.sep}`)) return 'daily'
  if (/(^|[\/_-])(backgrounds?|environment|locations?|plates?|bg|배경)([\/_-]|$)/i.test(normalized)) return 'background'
  if (/(dashboard|contact.?sheet|character.?sheet|reference.?board|style.?board|mood.?board|comparison|compare|대시보드|시트)/i.test(normalized)) return 'sheet'
  return null
}

function canonicalPenalty(relativePath: string) {
  let penalty = 0
  if (/(^|[/\\])YENA_[^/\\]*([/\\]|$)/i.test(relativePath)) penalty += 100
  if (/(^|[/\\])(_?original-aspect|_?invalid-aspect|qc-rejects?|archive|old)([/\\]|$)/i.test(relativePath)) penalty += 50
  return penalty
}

function chooseCanonical(group: CollectedAsset[]) {
  return [...group].sort((a, b) =>
    canonicalPenalty(a.relativePath) - canonicalPenalty(b.relativePath) ||
    a.relativePath.length - b.relativePath.length ||
    a.relativePath.localeCompare(b.relativePath, 'ko', { numeric: true }),
  )[0]
}

function collectYenaAssets(): { assets: CurationAsset[]; summary: DuplicateSummary } {
  if (!fs.existsSync(YENA_EPISODES_ROOT)) return { assets: [], summary: { groups: 0, hidden: 0 } }

  const collected: CollectedAsset[] = []
  const directories = [YENA_EPISODES_ROOT]

  while (directories.length > 0) {
    const current = directories.pop()!
    let entries: fs.Dirent[] = []
    try {
      entries = fs.readdirSync(current, { withFileTypes: true })
    } catch {
      continue
    }

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
      const absolutePath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        directories.push(absolutePath)
        continue
      }
      if (!entry.isFile() || !IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue

      const relativePath = path.relative(YENA_EPISODES_ROOT, absolutePath)
      const category = classifyAsset(relativePath)
      if (!category) continue

      collected.push({
        id: relativePath,
        name: entry.name,
        episode: episodeFromRelativePath(relativePath),
        collection: collectionFromRelativePath(relativePath),
        category,
        relativePath,
        url: `/@fs${absolutePath}`,
        duplicateIds: [],
        absolutePath,
        size: fs.statSync(absolutePath).size,
      })
    }
  }

  const dailyBySize = new Map<number, CollectedAsset[]>()
  for (const asset of collected) {
    if (asset.category !== 'daily') continue
    const sameSize = dailyBySize.get(asset.size) || []
    sameSize.push(asset)
    dailyBySize.set(asset.size, sameSize)
  }

  const hiddenIds = new Set<string>()
  const summary: DuplicateSummary = { groups: 0, hidden: 0 }
  for (const sameSize of dailyBySize.values()) {
    if (sameSize.length < 2) continue
    const byHash = new Map<string, CollectedAsset[]>()
    for (const asset of sameSize) {
      const hash = createHash('sha256').update(fs.readFileSync(asset.absolutePath)).digest('hex')
      const matches = byHash.get(hash) || []
      matches.push(asset)
      byHash.set(hash, matches)
    }
    for (const group of byHash.values()) {
      if (group.length < 2) continue
      const canonical = chooseCanonical(group)
      const duplicates = group.filter((asset) => asset.id !== canonical.id)
      canonical.duplicateIds = duplicates.map((asset) => asset.id)
      duplicates.forEach((asset) => hiddenIds.add(asset.id))
      summary.groups += 1
      summary.hidden += duplicates.length
    }
  }

  const assets = collected
    .filter((asset) => !hiddenIds.has(asset.id))
    .map(({ absolutePath: _absolutePath, size: _size, ...asset }) => asset)
    .sort((a, b) =>
    a.episode.localeCompare(b.episode, 'ko') ||
    a.collection.localeCompare(b.collection, 'ko') ||
    a.name.localeCompare(b.name, 'ko', { numeric: true }),
  )

  return { assets, summary }
}

function yenaCurationPlugin(): Plugin {
  const virtualId = 'virtual:yena-curation-assets'
  const resolvedId = `\0${virtualId}`

  return {
    name: 'yena-curation-assets',
    resolveId(id) {
      return id === virtualId ? resolvedId : null
    },
    load(id) {
      if (id !== resolvedId) return null
      const { assets, summary } = collectYenaAssets()
      return `export const duplicateSummary = ${JSON.stringify(summary)}; export default ${JSON.stringify(assets)}`
    },
  }
}

function imageOrderPlugin(): Plugin {
  const orderFile = path.resolve(__dirname, 'src/app/data/image-order.json')
  return {
    name: 'image-order-writer',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__image-order', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body)
            fs.writeFileSync(orderFile, JSON.stringify(parsed, null, 2) + '\n')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (error) {
            res.statusCode = 400
            res.end(String(error))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    yenaCurationPlugin(),
    imageOrderPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), YENA_EPISODES_ROOT],
    },
  },
})
