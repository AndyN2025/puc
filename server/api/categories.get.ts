import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const categories = await prisma.category.findMany({
    where: { isEnabled: true },
    include: {
      courses: {
        where: { isEnabled: true },
        include: { documents: true }
      }
    }
  })
  return categories.map(cat => ({
    ...cat,
    courses: cat.courses.map(c => ({
      ...c,
      users: JSON.parse(c.users || '[]'),
      requirements: JSON.parse(c.requirements || '[]')
    }))
  }))
})
