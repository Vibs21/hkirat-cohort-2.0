import { Hono } from 'hono';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();


//NOTE: Authenticating specific routes using middleware in HONO
blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
      c.status(401);
      return c.json({ error: 'unauthorized' });
    }
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: 'unauthorized' });
    }
    //@ts-ignore
    c.set('userId', payload.id);
    await next();
  });

blogRouter.post('/', async (c) => {
  return c.json({ message: 'Welcome Back!' });
});

blogRouter.put('/', async (c) => {
  return c.json({ message: 'Welcome Back!' });
});

blogRouter.get('/:id', async (c) => {
  const { id } = c.req.param();
  return c.json({ message: 'Blog details!' });
});

blogRouter.get('/bulk', async (c) => {
  ///@ts-ignore
  const prisma = c.get('prisma');
  //@ts-ignore
  const post = await prisma.user.findMany();
  return c.json(post);
});
