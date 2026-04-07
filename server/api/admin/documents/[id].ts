import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const method = event.method

  if (method === 'PUT') {
    const body = await readBody(event)
    return await prisma.documentBlank.update({
      where: { id },
      data: { title: body.title, fileUrl: body.fileUrl }
    })
  }

  if (method === 'DELETE') {
    await prisma.documentBlank.delete({ where: { id } })
    return { success: true }
  }
})
