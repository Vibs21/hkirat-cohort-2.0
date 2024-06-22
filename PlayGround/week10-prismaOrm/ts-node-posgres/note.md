
*Initialise an empty typescript project*

npm init -y
npx tsc --init


*Change the rootDir and outDir in tsconfig.json*


"rootDir": "./src",
"outDir": "./dist",

*Install the pg library and it’s types (because we’re using TS)*

npm install pg
npm install @types/pg