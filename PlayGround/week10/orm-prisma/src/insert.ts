import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function insertUser(email: string, firstName: string, lastName: string, password: string) {
    const res = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            password,
        },
        select: {
            id: true,
            firstName: true
        }
    })

    console.log("res", res)
}


insertUser("vibhu@gmail.com", "Vaibhav","Bajpayee", "123456").then((data)=> {
    console.log("data", data);
}).catch((err)=> {
    console.log("err", err);
}).finally(async () => {
    await prisma.$disconnect();
})