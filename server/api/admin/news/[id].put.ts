import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)

  const news = await prisma.news.update({
    where: { id },
    data: {
      slug: body.slug,
      title: body.title,
      date: body.date,
      category: body.category,
      excerpt: body.excerpt,
      accent: body.accent,
      body: JSON.stringify(body.body || [])
    }
  })

  return { ...news, body: JSON.parse(news.body) }
})
