import { Hono } from 'hono'
import userRoute from "./routes/user"
import { cors } from 'hono/cors'
const app = new Hono()



app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(cors());
app.route("/user",userRoute);

export default app
