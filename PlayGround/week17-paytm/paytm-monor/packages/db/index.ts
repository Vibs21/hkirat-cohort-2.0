import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

//it's a good practise to export it from here, so the other app will use it from here
// event though the same depedency is present in the root node modules but it's a good practice to
// to export all the things from here

//Encapsulation: It encapsulates the database logic within the db package. If you ever need to change the database client or modify how it’s used, you only need to change it in one place (inside the db package), and not everywhere it's used.

// Simplicity: It simplifies imports in other parts of your monorepo. Instead of importing from @prisma/client directly, you can import from db, making the imports cleaner and more consistent.

// Consistency: Ensures consistency across the repo. If you have a single point of entry for your database client, you avoid potential mismatches and issues that can arise from multiple different imports.