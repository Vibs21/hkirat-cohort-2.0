*TuroboREpo MonoRepo*

- npx create-turbo@latest
- do npm insall, at the global level after making any changes into the packages folder
- "@repo/common/*url*"; //the last name in match with the export name

**package.json of packages/common**

- every a folder which is created inside a packages folder need to update 2 things in the package.json file
  - name: "@repo/common" //whatever name you want to give prefix with @repo
  - *exports*: { './someName' : 'src/index.ts' }
    - this same name will be used by the file from apps/anyApp to get the value
    - after making changes into the packages folder do
      - *npm i* at root directory
  - *package.json of receiver of packages/common*
    - the enduser app which is going to get the value of packages needs to update its *depedencies* in package.json 
      - depedencies: {"@repo/common": "*"}


**to resolve any thing in the node.js app while getting from package**
- "build": "esbuild src/index.ts --platform=node --bundle --outdir=dist"
  - use esbuild to build the file
  - tsc doesn't able to resolve the dependency and hence the error while running the app


- npm run generate:component //to generate new components in the @repo/ui in the packages folder