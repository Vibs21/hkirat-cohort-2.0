import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: string;
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
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogDetails = await c.req.json();
    //@ts-ignore
    const userId = c.get('userId');
    console.log('userId', userId);

    try {
        const blogId = await prisma.blog.create({
            data: {
                title: blogDetails.title,
                content: blogDetails.content,
                //@ts-ignore
                authorId: userId,
            },
        });
        return c.json({ message: 'blog is been created!', blogId });
    } catch (e) {
        c.status(403)
        return c.json({ message: e })
    }
});

blogRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id');
    const blogDetails = await c.req.json();

    try {
        const blog = await prisma.blog.update({
            where: {
                id: blogId
            },
            data: {
                title: blogDetails.title,
                content: blogDetails.content,
                published: blogDetails?.published
            }
        })
        return c.json({ blogDetals: blog });
    } catch (e) {
        c.status(403);
        return c.json({ message: e })
    }
});

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const post = await prisma.user.findMany();
        return c.json(post);
    } catch (e) {
        c.status(403);
        return c.json({ message: e })
    }
});

//NOTE: When from GUI we are sending to /bulk or /sadasds (/:id) from GUI it looks same, hence updated the url or keep 
// the url with query param below, 
blogRouter.get('id/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    try {
        const post = await prisma.blog.findUnique({
            where: {
                id: id
            }
        })
        return c.json(post);
    } catch (e) {
        c.status(403);
        return c.json({ message: e })
    }
})
