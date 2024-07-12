import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createPostInput, updatePostInput } from '@vaibhavb_21/common-app';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: string;
    },
    Variables :{
        userId: string
    }
}>();



//NOTE: Authenticating specific routes using middleware in HONO
blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(403);
        return c.json({ error: 'unauthorized' });
    }
    const token = jwt.split(' ')[1];
    try{
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(403);
            return c.json({ error: 'unauthorized' });
        }
        c.set('userId', String(payload.id)); //String convets the word into the String and the errors goes away
        await next();
    } catch(e) {
        c.status(403);
        return c.json({ error: 'unauthorized' });
    }
});

blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogDetails = await c.req.json();

    //@ts-ignore
    const userId = c.get('userId');
    
    const { success } = createPostInput.safeParse(blogDetails);
    if (!success) {
        c.status(400);
		return c.json({ error: "invalid input" });
    }

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
    const {success} = updatePostInput.safeParse(blogDetails);
    if(!success) {
        c.status(403);
        return c.json({message: 'Incorrect Input!'})
    }

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
        const blogs = await prisma.blog.findMany(
            {
                select: {
                    content: true,
                    title: true,
                    id: true,
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        );
        return c.json(blogs);
    } catch (e) {
        c.status(403);
        return c.json({ message: e })
    }
});

//NOTE: When from GUI we are sending to /bulk or /sadasds (/:id) from GUI it looks same, hence updated the url or keep 
// the url with query param below, 
// route: '.bulk' and ':/id' //from UI it looks same to UONO, so either bulk should be above the :id, or update url
blogRouter.get('id/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    try {
        const post = await prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(post);
    } catch (e) {
        c.status(403);
        return c.json({ message: e })
    }
})
