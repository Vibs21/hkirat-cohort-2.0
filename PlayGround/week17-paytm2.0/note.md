**STACK**

- Frontend and Backend - Next.js (or Backend)
- Express - Auxilary backends
- Turborepo
- Postgres Database
- Prisma ORM
- Tailwind


**STEPS TO START**

- npx create-turbo@latest
- *install tailwind* in the next-js app inside the apps/user-app
  - in the tailwind config we have update path for *packages/ui* 
    - as the ui components are also the one who will be going to use tailwind
- install *prisma* 
  - install it in the packages/db
    - npm init -y => update package.json => name => @repo/db
    - npx tsc --init
    - npx prisma init
    - the idea is to use it for all the apps 
  - create index.ts => export * from "@prisma/client"


**packages/db** **How To Create a Package and Use it in the Multiple EndUser Application**
1. create a folder (db in this case)
2. Install all the required dependencies into the folder, e.g. npm init -y, tsc, prisma etc.
3. add all the code which you want to let the others app use, in this case the the generated clients
4. in this case, as we doesn't have any .ts file, we have created index.ts file
5. add line "export * from '@prisma/client'", this line is imp in terms of modularity and force the apps, to use client from this package and not from the node modules directly, have many advantage of using this method
6. update package.json
   1. name: "@repo/db"
   2. export: { './client': './index.ts' } => explain => { './anyName': './path_to_file_Exporting_content' }
7. Do npm install, globally
8. Now treat the package db as a dependency, which you have created and now where ever we need it we need to put it
9. Update the apps/app, package.json, dependency with above created db dependency, "@repo/db" : "*"
10. Do npm install one more time
11. Now import the above exported client where ever you want to use the code
12. import { PrismaClient } from '@repo/db/client'
    1.  if you notice the method of prismaClient and all will always be same as we are importing the same Prisma which we have always imported but the only difference now is the place from where we are now importing it.
    2.  We need to increase the reusability of the code and hence we have put it in the package folder and exporting it from there and importing it here and if you see, rest all the things initialization and every things are same only.