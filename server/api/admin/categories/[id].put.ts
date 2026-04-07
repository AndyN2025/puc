import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)

  return await prisma.category.update({
    where: { id },
    data: {
      title: body.title,
      howWeWork: body.howWeWork,
      isEnabled: body.isEnabled
    }
  })
})
