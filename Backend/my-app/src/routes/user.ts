import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";


const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET:string,
    }
}>();

app.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const user = await prisma.createAccount.create({
            data: {
                email: body.email,
                password: body.password,
            }
        });
          const token = await sign({user:user.id},c.env.JWT_SECRET)
        return c.json({ id:user.id,token, message: "Account Created" });

    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while signing up" });
    } 
});

app.post('/name', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const userName = await prisma.username.create({
            data: {
                firstName: body.firstName,
                lastname: body.lastname,
            }
        });

        return c.json({ userName, message: "User name set" });
    } catch (error) {
        c.status(403);
        return c.json({ error: "User Name Not set" });
    } 
});

export default app;