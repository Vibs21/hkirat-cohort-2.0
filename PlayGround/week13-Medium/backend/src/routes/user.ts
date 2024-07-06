import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';

export const userRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', async (c) => {
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

userRouter.post('/signin', async (c) => {
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
      return c.json({
        message: 'User not found, password or username are incorrect!',
      });
    } else {
    }
    return c.json({ user, jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
});
