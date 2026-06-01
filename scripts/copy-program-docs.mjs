/**
 * Копирует программы обучения в public/ перед сборкой (Nuxt → .output/public).
 * Источник: assets/documents/programs
 *
 * Имена файлов приводятся к NFC: в macOS часто NFD (й = и + U+0306),
 * а в utils.ts — NFC; на Linux (GitHub Pages) пути не совпадают → 404 → HTML вместо PDF.
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'assets/documents/programs')
const dest = join(root, 'public/documents/programs')

function copyProgramsRecursive(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true })

  for (const name of readdirSync(srcDir)) {
    const srcPath = join(srcDir, name)
    const destName = name.normalize('NFC')
    const destPath = join(destDir, destName)

    if (statSync(srcPath).isDirectory()) {
      copyProgramsRecursive(srcPath, destPath)
      continue
    }

    if (existsSync(destPath) && destPath !== srcPath) {
      console.warn('[copy-program-docs] Коллизия после NFC:', destName)
    }
    copyFileSync(srcPath, destPath)
  }
}

if (!existsSync(src)) {
  console.warn('[copy-program-docs] Папка не найдена:', src)
  process.exit(0)
}

mkdirSync(dirname(dest), { recursive: true })
if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true })
}

copyProgramsRecursive(src, dest)
console.log('[copy-program-docs] Скопировано (имена в NFC):', src, '→', dest)
