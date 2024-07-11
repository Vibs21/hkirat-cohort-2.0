
*BackEnd Stack and Steps*

1. **npm create hono@latest** > CloudFlare Worker as an environment
  - Hono - For Edge Network
2. aiven.io > **to get psql DB URL** (or you can use Neon DB)
3. prisma accelerate > New Project > **Use Psql DB link here** > **To get collection pool URL**
   1. PA helps to create collection pool, so that only 1 req will goto DB and rest req from edge servers it will take care within itself
4. Install Prisma
   1. npm i prisma
   2. npx prisma init
5. Update the 2 URL's PSQL & Accelerate in the following files
   1. .env > PSQL URL
   2. wrangler.toml > Accelerate URL > [vars], DATABASE_URL = 'URL'
6. npx prisma migrate dev --name init_schema //migrates your local changes to your actual DB
7. npx prisma generate --no-engine //remove the query engine binaries from prisma client and take care of it remorely
8. npm install @prisma/extension-accelerate

*Once the APP is UP and Running*

9. npx wrangler login
10. npm run deploy 
    1.  **this will deploy it in clouldflare environment**


*Common Folder*

1. mkdir common
2. cd common
3. npm init -y
4. npx tsc --init
5. Update tsconfig.json
   1. "rootDir": "./src",
   2. "outDir": "./dist",
   3. "declaration": true,
6. Add src to .npmignore
7. npm i zod
8. npx tsc -b //after making all the changes into src/index.ts file
9. npm publish --access public
10. **Very IMP Update CORS**
    1.  app.use('/*', cors({
            origin: '*', // Change '*' to specific origin(s) if needed
            allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowHeaders: ['Content-Type', 'Authorization']
         }));




*Edge Network*

- For backend we can't use CDN as, the request for the would always be specefic to the user and that's the reason we can't cache the data using CDN, so better way is using Edge Network and deploy the BE at multiple places.
- When user ask for the data, the request will go to the nearest Data Center and it will be served
- When No Caching, use Edge Network
- When Data is expensive or large use CDN