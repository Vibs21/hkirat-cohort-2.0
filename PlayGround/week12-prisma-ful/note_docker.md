*Steps to up and running Prisma*

- npm init -y //initialise node app
- npm install prisma typescript ts-node @types/node --save //add dependencies
- npx tsc --init //initialize typescript //initialize a typescript
- npx prisma init //initialize a fresh prisma project

*Quick Docker*

- *Docker run mongo* //to run mongo locally, it also downloads the recourses
  - this will run the image in the default port of the image inside the container and we can't react it to it yet
- *docker run -d -p 27017(yaha_Se_sunna):27017(yaha_pe_sunna) mongo*
  - this cmd let's you do the port mapping and run mongo db in the detached mode, now you can connect with DB running inside the docker from the outside
  - all the time you hit this cmd, the docker will run with new name/container, solution below
  - *'-d'* let's you run it in detached mode, meaning you can run docker in the background, rm it if you want to see logs
- *docker ps*
  - Inspect running containers
  - *docker kill* <container_id>`
    - Stop the specified container

*CMD to Create Container with Name, Start Stop and Remove it*

- docker run -d -p 27017:27017 --name my_mongo_container mongo
- docker start my_mongo_container
- docker stop my_mongo_container
- docker rm my_mongo_container

*If you need to persist data or share data between containers*

- docker volume create my_data_volume
- docker run -d -p 27017:27017 --name my_mongo_container -v my_data_volume:/data/db mongo
- docker run -d -p 27017:27017 --name my_other_mongo_container -v my_data_volume:/data/db mongo

# By using the volume my_data_volume, both containers will share the same data. This way, your data will persist even if the containers are stopped or removed, and you can access the same data from multiple containers

*Postgres Docker need something more*

- *docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres*
  - '-e' is to set the environment variable, rest all is  

*Connection String*

- *postgresql://postgres:mysecretpassword@localhost:5432/postgres*
  - postgres is the default username and pass for postgres, if you want to change it
    - -e POSTGRES_USER, add it after password

Note: on the right what you are seeing the default port of the databases

**connect it via terminal**
- psql -h localhost -U postgres -d postgres

OR
- docker ps //to get the container id
- docker exec -it 7d9648157246 /bin/bash
- psql -U postgres