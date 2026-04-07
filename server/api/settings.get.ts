import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const settings = await prisma.settings.findFirst({
    include: { phones: true }
  })
  return settings
})
