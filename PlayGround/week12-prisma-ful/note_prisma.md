*Steps for Prisma*

- npm init -y
- npm install prisma typescript ts-node @types/node --save
- npx tsc --init
- npx prisma init
- docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
  - start the DB
  - update the details of the DB in the .env file generated after prisma init
- npx prisma migrate dev --name UserAndTodoAdded
  - once you have created models in the schema.prisma file
  - always trigger this cmd anytime you update anything to the schema.prisma file
- npx prisma generate
  - helps to generate the client
  - defination: anything which help to talk with the DB is called as client

*To Query to the DB using PSQL*

- docker exec -it postgres-container psql -U postgres //not required in windows
- psql -h localhost -d postgrels -U postgres
  - password is: mysecretpassword