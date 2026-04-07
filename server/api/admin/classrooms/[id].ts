import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const method = event.method

  if (method === 'PUT') {
    const body = await readBody(event)
    return await prisma.classroom.update({
      where: { id },
      data: { name: body.name, content: body.content }
    })
  }

  if (method === 'DELETE') {
    await prisma.classroom.delete({ where: { id } })
    return { success: true }
  }
})
