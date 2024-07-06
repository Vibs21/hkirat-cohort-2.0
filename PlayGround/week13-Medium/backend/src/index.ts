import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify, decode } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>().basePath('/api/v1');

//.basePath('/api/v1')

//NOTE: Declaration of global varible using middle ware
app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //@ts-ignore
  c.set('prisma', prisma);
  await next();
});

//NOTE: router abstracted to the individual files
app.route('/user', userRouter);
app.route('/blog', blogRouter);


export default app;
