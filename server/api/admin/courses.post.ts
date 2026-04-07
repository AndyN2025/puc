import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const course = await prisma.course.create({
    data: {
      category: { connect: { slug: body.categorySlug } },
      code: body.code,
      textCode: body.textCode || body.code,
      title: body.title,
      hours: String(body.hours ?? ''),
      mainDescription: body.mainDescription || '',
      users: JSON.stringify(body.users || []),
      requirements: JSON.stringify(body.requirements || []),
      format: body.format || '',
      period: body.period || '',
      applicationFile: body.applicationFile || '',
      programFile: body.programFile || '',
      isEnabled: body.isEnabled ?? true
    }
  })

  return course
})
