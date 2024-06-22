import { PrismaClient } from "@prisma/client";
import { string } from 'zod';

const prisma = new PrismaClient();

interface UpdateUser {
    firstName: string,
    lastName: string
}

const updateUser = async (email: string, {firstName, lastName}: UpdateUser) => {
    const res = await prisma.user.update({
        where: { email },
        data: { firstName, lastName },
        select: {firstName: true}
    });
    console.log("res", res)
    return res;
}

updateUser("vaibhavB@gmail.com", {firstName: "Vibhu", lastName: "Bajpayee"}).then((res)=> {
    console.log("res ins", res)
}).catch((err)=> {
    console.log("err", err)
}).finally(async ()=> {
    await prisma.$disconnect();
})