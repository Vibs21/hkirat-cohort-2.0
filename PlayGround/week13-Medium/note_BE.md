
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






*Edge Network*

- For backend we can't use CDN as, the request for the would always be specefic to the user and that's the reason we can't cache the data using CDN, so better way is using Edge Network and deploy the BE at multiple places.
- When user ask for the data, the request will go to the nearest Data Center and it will be served
- When No Caching, use Edge Network
- When Data is expensive or large use CDN