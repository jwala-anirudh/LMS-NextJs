const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Music' },
        { name: 'Fitness' },
        { name: 'Accounting' },
        { name: 'Photography' },
        { name: 'Filming' },
        { name: 'Engineering' },
      ],
    });

    console.log('Success seeding categories');
  } catch (error) {
    console.log('Error seeding the database categories', error);
  } finally {
    await database.$disconnect();
  }
}

main();
