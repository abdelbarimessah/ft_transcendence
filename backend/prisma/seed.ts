// // import { faker } from '@faker-js/faker';
// import * as faker from 'faker';
// import { Prisma, PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const count = 500;
//   // Used for authentication
//   const users: Prisma.UserCreateManyInput[] = [ ];

//   for (let i = 0; i < count; i++) {
//     users.push({
//       providerId: faker.string.uuid(),
//       nickName: faker.person.fullName(),
//       firstName: faker.internet.displayName(),
//       avatar: faker.internet.avatar(),
//     });
//   }

//   await prisma.user.createMany({ data: users, skipDuplicates: true });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
