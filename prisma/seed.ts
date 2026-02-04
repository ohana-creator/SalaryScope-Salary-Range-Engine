import { PrismaClient, Level, Currency } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const dataScience = await prisma.area.create({
    data: { name: 'Data Science', slug: 'data-science' }
  });

  const backend = await prisma.area.create({
    data: { name: 'Backend', slug: 'backend' }
  });

  const dsRoles = await Promise.all([
    prisma.role.create({ data: { name: 'Data Analyst', areaId: dataScience.id } }),
    prisma.role.create({ data: { name: 'Data Engineer', areaId: dataScience.id } }),
  ]);

  const backendRoles = await Promise.all([
    prisma.role.create({ data: { name: 'Backend Engineer', areaId: backend.id } }),
    prisma.role.create({ data: { name: 'DevOps Engineer', areaId: backend.id } }),
  ]);

  await prisma.salaryEntry.createMany({
    data: [
      { roleId: dsRoles[0].id, level: Level.JUNIOR, country: 'Angola', salary: 800, currency: Currency.USD, source: 'seed' },
      { roleId: dsRoles[0].id, level: Level.MID, country: 'Angola', salary: 1200, currency: Currency.USD, source: 'seed' },
      { roleId: dsRoles[0].id, level: Level.SENIOR, country: 'Angola', salary: 1600, currency: Currency.USD, source: 'seed' },
      { roleId: dsRoles[1].id, level: Level.JUNIOR, country: 'Angola', salary: 900, currency: Currency.USD, source: 'seed' },
      { roleId: dsRoles[1].id, level: Level.MID, country: 'Angola', salary: 1300, currency: Currency.USD, source: 'seed' },
      { roleId: backendRoles[0].id, level: Level.JUNIOR, country: 'Angola', salary: 850, currency: Currency.USD, source: 'seed' },
      { roleId: backendRoles[0].id, level: Level.MID, country: 'Angola', salary: 1250, currency: Currency.USD, source: 'seed' },
      { roleId: backendRoles[1].id, level: Level.SENIOR, country: 'Angola', salary: 1700, currency: Currency.USD, source: 'seed' },
    ]
  });

  console.log('Seed completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
