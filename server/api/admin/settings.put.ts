import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { mainTitle, mainDescription, email, phones } = body

  // Upsert settings (always id=1)
  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    update: { mainTitle, mainDescription, email },
    create: { mainTitle, mainDescription, email }
  })

  // Replace phones
  if (phones && Array.isArray(phones)) {
    await prisma.phone.deleteMany({ where: { settingsId: 1 } })
    for (const p of phones) {
      await prisma.phone.create({
        data: {
          tel: p.tel,
          display8: p.display8,
          displayPlus7: p.displayPlus7,
          settingsId: 1
        }
      })
    }
  }

  return await prisma.settings.findFirst({ include: { phones: true } })
})
