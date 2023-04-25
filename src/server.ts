import fastify from "fastify";
import { prisma } from "./lib/prisma";



const app = fastify()

app.get('/corretores', (req, res) => {

  const corretores = prisma.corretor.findMany()

  res.send(corretores)
})

app.listen({
  port: 3333
})
.then(() => {
  console.log('HTTP SERVER IS RUNNING')
})