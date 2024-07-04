import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>().basePath('/api/v1');


app.post('/signup', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    // Enhanced error logging
    console.error('Error during signup:');
    c.status(403);
    return c.json({ error: e });
  }
});

app.post('/testup', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const test = await prisma.test.create({
      data: {
       name: body.name
      }
    });
    
    return c.json({ test });
  } catch (e) {
    // Enhanced error logging
    console.error('Error during test:');
    c.status(403);
    return c.json({ error: e });
  }
})


app.post('/signin', async (c) => {
  return c.json({ message: 'Welcome Back!' });
});

app.post('/blog', async (c) => {
  return c.json({ message: 'Welcome Back!' });
});

app.put('/blog', async (c) => {
  return c.json({ message: 'Welcome Back!' });
});

app.get('/blog/:id', async (c) => {
  const { id } = c.req.param();
  return c.json({ message: 'Blog details!' });
});

app.get('/getAll', async (c) => {

  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.user.findMany();

	return c.json(post);
});

export default app;
