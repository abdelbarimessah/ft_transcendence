import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = 200;
  // Used for authentication
  const users: Prisma.UserCreateManyInput[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      providerId: faker.string.uuid(),
      firstName: faker.person.firstName(),
      nickName: faker.internet.displayName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      cover: faker.image.url({ height: 200, width: 600 }),
    });
  }

  await prisma.user.createMany({ data: users, skipDuplicates: true });
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

