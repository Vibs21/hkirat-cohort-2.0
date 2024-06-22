import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const selectUser = async (email: string) => {
    const res = prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
        }
    })
    return res;
}

selectUser("vibhu@gmail.com")
    .then((res)=> {
        console.log("res", res);
    }).catch((err)=> {
        console.log("err", err);
    }).finally(async ()=> {
        await prisma.$disconnect();
    })