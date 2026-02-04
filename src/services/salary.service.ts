import { PrismaClient, Level } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get salary statistics for a role + level + country
 */
export async function getSalaryStats(roleId: number, level: Level, country: string) {
  // Fetch all salaries matching criteria
  const entries = await prisma.salaryEntry.findMany({
    where: {
      roleId,
      level,
      country,
    },
    select: {
      salary: true,
    },
  });

  const salaries = entries.map(e => e.salary);

  if (salaries.length === 0) return null;

  // Sort ascending
  salaries.sort((a, b) => a - b);

  const n = salaries.length;

  // Min
  const min = salaries[0];

  // Max
  const max = salaries[n - 1];

  // Median
  const median =
    n % 2 === 1
      ? salaries[Math.floor(n / 2)]
      : (salaries[n / 2 - 1] + salaries[n / 2]) / 2;

  // P25 / P75 (optional)
  const p25 = salaries[Math.floor(n * 0.25)];
  const p75 = salaries[Math.floor(n * 0.75)];

  return {
    min,
    median,
    max,
    p25,
    p75,
    samples: n,
  };
}
