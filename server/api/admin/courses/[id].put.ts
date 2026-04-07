import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)

  const course = await prisma.course.update({
    where: { id },
    data: {
      code: body.code,
      textCode: body.textCode,
      title: body.title,
      hours: body.hours,
      mainDescription: body.mainDescription,
      users: JSON.stringify(body.users || []),
      requirements: JSON.stringify(body.requirements || []),
      format: body.format,
      period: body.period,
      applicationFile: body.applicationFile,
      programFile: body.programFile,
      isEnabled: body.isEnabled
    }
  })

  return course
})
