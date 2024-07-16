*merging of the Routes*

- if you wrap the folder name (auth) - inside the brackets the nextjs routes ignore it
  - localhost:3000/signup instead of auth/signin
  - layout will be common between all the folders inside the auth folder

*NextJs are Having few Opinionted Things*
- What is meaning of opinionted 
  - If you want to do certain things follow what rule NextJs team has suggested
  - For example: 
    - Loading page if API is taking time in: api/loading.tsx 
        - automatically it will load it when needed
    - folder based routing 
    - server client classification 
    - **It is not necessary that you are putting pages or routes inside any specific folder**
      - File Name is the thing which Nextjs looks for, if it's *page.tsx it a page* and of *routes.tsx it's a route*, it should be inside the *app* folder though that's the only requisite

*Async Component*
- In the server side code you can create component with async in front of it and can use it to fetch data or to perform something 



***OPINIOTED Things from NEXTJS**

- *(auth)* : if brackets are given then that folder name will get skipped from the path 
  - e.g. localhost:3000/user instead of e.g. localhost:3000/auth/user  
- *component* should always declared inside app/(any)folder with name page.tsx, e.g. app/user/page.tsx
  - you can do nesting to support routing as you please
- for *loading* template you can create file with exact name 'app/loading.tsx'
  - if you want a different kind of loader for each component just add a 'layout.tsx' file inside that component folder
- you can *share the same layout* for the component if you want to show some comment things then you can create a folder and create 2 different folder inside it and 1 layout.tsx
  - now the 2 different folder will share the same layout.tsx
- *routes* should always declared inside app/api folder with name route.tsx, e.g. app/api/user/route.tsx
  - route file will contain all the type of request for that path i.e. GET, POST etc. 
  - it uses 'import { NextRequest } from 'next/server';' to get all the *payload* data 


**SingleTon**
- Initialize the singleton prisma client to avoid multipe connects issue