import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return await prisma.classroom.findMany()
  }

  if (method === 'POST') {
    const body = await readBody(event)
    return await prisma.classroom.create({
      data: { name: body.name, content: body.content || '' }
    })
  }
})
