import { Hono } from 'hono'

const app = new Hono();


async function authMiddleware(c: any, next: any) {
  const authHeader = c.req.header("Authorization");
  if(authHeader == 'pass') {
    c.req.test = 'test content';
    await next();
  } else {
    return c.text('Unauthorized', 401);
  }
}

app.get('/', async (c) => {
  // const body = await c.req.json()
  // console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})

app.post('/hihono', authMiddleware,  async (c) => {
  const body = await c.req.json()
  console.log(body.name);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));
  console.log(c.req.query("sharam"));
  

  return c.text('Hi ' + body.name +  ' Hello from Hono!')
})

export default app
