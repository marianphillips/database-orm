const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {

  // Add your code here

  const createdCustomer = await prisma.customer.create({
      data: {
        name: "Alice",
        contact: {
          create: {
            phone: "07770744444",
            email: "me@me.com",
          },
        },
      }
  })

  const createdScreen1 = await prisma.screen.create({data: {number:1}}) 
  const createdScreen2 = await prisma.screen.create({data: {number:2}}) 
  
  const createdMovie1 = await prisma.movie.create({
    data: {
      title: "Blues Brothers",
      runtimeMins: 89,
      screenings: {
        create: [
            {
              startsAt: new Date(2022, 02, 30, 18, 35),
              screenId: createdScreen1.id,
              tickets: { 
                create : [{
                customerId: createdCustomer.id,
                 }]
            },  
            },
            {
              startsAt: new Date(2022, 02, 30, 21, 15),
              screenId: createdScreen2.id
            },
        ],
      },
    },

  });

  const createdMovie2 = await prisma.movie.create({
      data : {
        title: "Bladerunner",
        runtimeMins: 127,
        screenings: {
          create: [
              {
                startsAt: new Date(2022, 02, 30, 17, 45),
                screenId: createdScreen2.id,  
              },
              {
                startsAt: new Date(2022, 02, 31, 18, 00),
                screenId: createdScreen1.id,
                tickets: { 
                    create : [{
                    customerId: createdCustomer.id,
                     }]
                }
              },
          ],
        },
      },
  })

//   const createdMovie = await prisma.movie.create({
//     data: {
//       title: "Blues Brothers",
//       runtimeMins: 89,
//       screenings: {
//         create: [
//             {
//               startsAt: new Date(2022, 02, 30, 18, 35),
//               screen: {
//                   create: {
//                     number: 1,
//                 },
//               },
//               tickets: {
//                   create: [ {
//                       customer : {
//                           create : {
//                             name: "Alice",
//                             contact: {
//                               create: {
//                                 phone: "07770744444",
//                                 email: "me@me.com",
//                               },
//                             },
//                           }
//                       }
//                   }]
//               }
//             },
//             {
//               startsAt: new Date(2022, 02, 30, 21, 15),
//               screen: {
//                   create: {
//                     number: 2,
//                   },
//               },
//             },
//         ],
//       },
//     },

//   });

  console.log("Movie created", createdMovie1);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
