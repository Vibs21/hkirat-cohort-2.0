import { Hono } from 'hono';
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

app.use('/*', cors());



//NOTE: Declaration of global varible using middle ware


app.get('/api/v1/user', (c) => c.json({ message: 'User route' }));

//NOTE: router abstracted to the individual files
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);


export default app;
