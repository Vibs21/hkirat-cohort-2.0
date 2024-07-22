*Next Auth Cookies*

- [...nextauth] // you can give any name after 3 dots, it's called as global catch route
  - when you want to catch all the routes with anyname which is written before it's folder
  - e.g. api/auth/*anyName*
    - whatever will now come after auth/ will be handled by the route file inside this folder
      - http://localhost:3000/api/auth/signin
      - http://localhost:3000/api/auth/123
      - http://localhost:3000/api/auth/random/random2
    - if you want to handle route till, api/auth, you need to create file inside auth folder
