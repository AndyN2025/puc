import prisma from '~/server/utils/prisma'

/**
 * GET /api/admin/categories — все категории с курсами (включая отключённые)
 */
export default defineEventHandler(async () => {
  const categories = await prisma.category.findMany({
    include: {
      courses: {
        include: { documents: true },
        orderBy: { code: 'asc' }
      }
    },
    orderBy: { slug: 'asc' }
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
