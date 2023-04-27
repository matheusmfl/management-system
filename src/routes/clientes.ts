import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import * as z from 'zod'
import { randomUUID } from 'crypto'

const userClientSchema = z.object({
  name: z.string(),
  username: z.string(),
  cpf: z.string(),
  observation: z.string(),
})
type UserClient = z.infer<typeof userClientSchema>

export async function clientesRouter(app: FastifyInstance) {
  // buscar todos os clientes
  app.get('/clientes', async (req, res) => {
    const listaClientes = prisma.client.findMany()

    return res.send(listaClientes)
  })

  // cadastrar novo cliente
  app.post('/clientes', async(req, res) => {
    try{
      const userClientData: UserClient = userClientSchema.parse(req.body)


      const {cpf, name, observation, username} = userClientData
    }
  })
}
