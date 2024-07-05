import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify, decode } from 'hono/jwt';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>().basePath('/api/v1');

//NOTE: Declaration of global varible using middle ware
app.use('*', async (c, next) => {
	const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  //@ts-ignore
  c.set('prisma', prisma);
  await next()
});

//NOTE: Authenticating specific routes using middleware in HONO
app.use('/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  //@ts-ignore
	c.set('userId', payload.id);
	await next()
});

app.post('/signup', async (c) => {
  //@ts-ignore
  const prisma = c.get('prisma');

  const body = await c.req.json();
  try {
     //@ts-ignore
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
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

app.post('/signin', async (c) => {
  //@ts-ignore
  const prisma = c.get('prisma');
  const body = await c.req.json();
  const jwt = c.req.header().authorization.split(' ')[1];

  try {
    const isVerified = await verify(jwt, c.env.JWT_SECRET);
    //@ts-ignore
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
        // @ts-ignore
        id: isVerified.id,
      },
      select: {
        name: true,
        email: true,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: 'User not found, password or username are incorrect!' });
    } else {
    }
    return c.json({ user });
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
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
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.user.findMany();

  return c.json(post);
});

export default app;
