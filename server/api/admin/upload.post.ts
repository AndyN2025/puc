import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  const results: { name: string; url: string }[] = []

  for (const file of files) {
    if (!file.filename) continue
    const safeName = `${Date.now()}_${file.filename.replace(/[^a-zA-Zа-яА-Я0-9._-]/g, '_')}`
    const filePath = join(uploadDir, safeName)
    await writeFile(filePath, file.data)
    results.push({
      name: file.filename,
      url: `/uploads/${safeName}`
    })
  }

  return results
})
