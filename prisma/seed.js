import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
    const user = [
        { username: "Murilobmilan", email: "murilo.brustolin@gmail.com", password: "algumaCoisa", anonymous: true,  },
        { username: "Victor", email: "victor.algo@gmail.com", password: "@senha123", anonymous: false,  }

    ]

    await prisma.users.createMany({data: user});

    console.log('The seed worked very well 👍')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect(
            process.exit(1)
        )
    })