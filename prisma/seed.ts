import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const operations = [
    // createMany
  ];

  Promise.allSettled(operations).then((results) => {
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Operation ${index + 1} failed:`, result.reason);
      }
    });
  });

  // eslint-disable-next-line no-console
  console.log('Seed data inserted successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
