import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const method = event.method

  if (method === 'PUT') {
    const body = await readBody(event)
    return await prisma.teacher.update({
      where: { id },
      data: {
        name: body.name,
        diploma: body.diploma,
        certificate: body.certificate,
        programs: JSON.stringify(body.programs || [])
      }
    })
  }

  if (method === 'DELETE') {
    await prisma.teacher.delete({ where: { id } })
    return { success: true }
  }
})
