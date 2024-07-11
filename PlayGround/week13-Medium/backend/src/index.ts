import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify, decode } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//.basePath('/api/v1')



app.use('/*', cors({
  origin: '*', // Change '*' to specific origin(s) if needed
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));


//NOTE: Declaration of global varible using middle ware
app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //@ts-ignore
  c.set('prisma', prisma);
  await next();
});

app.get('/api/v1/user', (c) => c.json({ message: 'User route' }));

//NOTE: router abstracted to the individual files
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);


export default app;
