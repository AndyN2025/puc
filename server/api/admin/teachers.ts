import prisma from '~/server/utils/prisma'

// CRUD for teachers
export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return await prisma.teacher.findMany()
  }

  if (method === 'POST') {
    const body = await readBody(event)
    return await prisma.teacher.create({
      data: {
        name: body.name,
        diploma: body.diploma || '',
        certificate: body.certificate || '',
        programs: JSON.stringify(body.programs || [])
      }
    })
  }
})
