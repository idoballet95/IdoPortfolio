import fs from 'node:fs'
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

function collectYenaAssets(): CurationAsset[] {
  if (!fs.existsSync(YENA_EPISODES_ROOT)) return []

  const assets: CurationAsset[] = []
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

      assets.push({
        id: relativePath,
        name: entry.name,
        episode: episodeFromRelativePath(relativePath),
        collection: collectionFromRelativePath(relativePath),
        category,
        relativePath,
        url: `/@fs${absolutePath}`,
      })
    }
  }

  return assets.sort((a, b) =>
    a.episode.localeCompare(b.episode, 'ko') ||
    a.collection.localeCompare(b.collection, 'ko') ||
    a.name.localeCompare(b.name, 'ko', { numeric: true }),
  )
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
      return `export default ${JSON.stringify(collectYenaAssets())}`
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
