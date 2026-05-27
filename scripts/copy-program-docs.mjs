/**
 * Копирует программы обучения в public/ перед сборкой (Nuxt → .output/public).
 * Источник: assets/documents/programs
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'assets/documents/programs')
const dest = join(root, 'public/documents/programs')

if (!existsSync(src)) {
  console.warn('[copy-program-docs] Папка не найдена:', src)
  process.exit(0)
}

mkdirSync(dirname(dest), { recursive: true })
if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true })
}
cpSync(src, dest, { recursive: true, force: true })
console.log('[copy-program-docs] Скопировано:', src, '→', dest)
