import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string, email: string) {
  const res = await prisma.user.create({
    data: {
        username,
        password,
        firstName,
        lastName,
        email
    }
  })
  console.log(res);
}

async function createTodo(userId: number, title: string, description: string) {
    const response = await prisma.todo.create({
        data: {
            userId,
            title,
            description
        }
    })
}

async function getTodosAndUserDetails(userId: number, ) {
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId,
        },
        select: {
            user: {
                select: {
                    username: true,
                    firstName: true
                }
            },
            title: true,
            description: true
        }
    });
    console.log(todos);
}

// insertUser("admin1", "123456", "vaibhav", "bajpayee", "abc@gmail.com")
// createTodo(1,'todo1', 'deatails for todo1');
getTodosAndUserDetails(1);