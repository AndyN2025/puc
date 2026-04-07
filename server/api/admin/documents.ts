import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return await prisma.documentBlank.findMany()
  }

  if (method === 'POST') {
    const body = await readBody(event)
    return await prisma.documentBlank.create({
      data: { title: body.title, fileUrl: body.fileUrl }
    })
  }
})
