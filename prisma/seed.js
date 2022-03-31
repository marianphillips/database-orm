const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {

  // Add your code here

  const createdMovie = await prisma.movie.create({
    data: {
      title: "Blues Brothers",
      runtimeMins: 89,
      screenings: {
        create: [
            {
              startsAt: new Date(2022, 02, 30, 18, 35),
              screen: {
                connectOrCreate: {
                  where: {
                    id: 1,
                  },
                  create: {
                    number: 1,
                  },
                },
              },
              tickets: {
                  create: [ {
                      customer : {
                          create : {
                            name: "Alice",
                            contact: {
                              create: {
                                phone: "07770744444",
                                email: "me@me.com",
                              },
                            },
                          }
                      }
                  }]
              }
            },
            {
              startsAt: new Date(2022, 02, 30, 21, 15),
              screen: {
                connectOrCreate: {
                  where: {
                    id: 2,
                  },
                  create: {
                    number: 2,
                  },
                },
              },
            },
        ],
      },
    },
    include: {
      screenings: {
          include: {
              screen: true,
              tickets: {
                  include : {
                      customer : {
                          include : {
                              contact: true,
                          }
                      }
                  }
              }
          }
      } 
    },
  });

  console.log("Movie created", createdMovie);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
