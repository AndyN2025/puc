import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await prisma.category.create({
    data: {
      slug: body.slug,
      title: body.title,
      howWeWork: body.howWeWork || '',
      isEnabled: body.isEnabled ?? true
    }
  })
})
