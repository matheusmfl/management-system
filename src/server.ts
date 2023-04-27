import fastify from 'fastify'
import { prisma } from './lib/prisma'
import crypto from 'node:crypto'
import { corretoresRoutes } from './routes/corretores'

const app = fastify()

// Register server de plugin no fastify para poder consumir dados de outra parte do código...
// é possível passar um objeto de configurações, como segundo argumento, que aceita o prefix:
// ele serve para deixar um prefixo na rota, /users/corretores : exemplo
app.register(corretoresRoutes, {
  prefix: 'users',
})

app.get('/propostas', async (req, res) => {
  const propostas = await prisma.proposta.findMany()

  return res.send(propostas + 'ola mundo')
})

app.get('/clientes', async (req, res) => {
  const clientes = await prisma.client.findMany()

  res.send(clientes)
})

app.post('/corretores', async (req, res) => {
  const { name, username, isAdmin }: any = req.body

  const newCorretor = await prisma.corretor.create({
    data: {
      name,
      username,
      id: crypto.randomUUID(),
      isAdmin,
    },
  })
  console.log(newCorretor)
  return res.send(newCorretor)
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP SERVER IS RUNNING')
  })
