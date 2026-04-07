import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, title, date, category, excerpt, accent, body: newsBody } = body

  const news = await prisma.news.create({
    data: {
      slug,
      title,
      date: date || new Date().toLocaleDateString('ru-RU'),
      category: category || '',
      excerpt: excerpt || '',
      accent: accent || 0,
      body: JSON.stringify(newsBody || [])
    }
  })

  return { ...news, body: JSON.parse(news.body) }
})
