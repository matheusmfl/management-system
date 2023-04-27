import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import * as z from 'zod'
import { randomUUID } from 'crypto'

const userClientSchema = z.object({
  name: z.string(),
  cpf: z.number(),
  observations: z.string(),
})
type UserClient = z.infer<typeof userClientSchema>

export async function clientesRouter(app: FastifyInstance) {
  // buscar todos os clientes
  app.get('/clientes', async (req, res) => {
    const listaClientes = await prisma.client.findMany()

    return res.status(200).send(listaClientes)
  })

  // buscar um cliente por nome
  app.get('/clientes/:name', async (req, res) => {
    const getClientParamsSchema = z.object({
      name: z.string().nonempty(),
    })

    const { name } = getClientParamsSchema.parse(req.params)

    const clientByName = await prisma.client.findMany({
      where: {
        name: {
          contains: name.toLowerCase(),
        },
      },
    })

    if (clientByName) {
      console.log(clientByName)
      return res.status(200).send(clientByName)
    } else {
      return res
        .status(404)
        .send({ message: 'Cliente não encontrado em nosso sistema' })
    }
  })

  // cadastrar novo cliente
  app.post('/clientes', async (req, res) => {
    const userClientData: UserClient = userClientSchema.parse(req.body)

    const { cpf, name, observations } = userClientData

    const novoCliente = await prisma.client.create({
      data: {
        id: randomUUID(),
        cpf,
        name,
        observations,
      },
    })

    if (novoCliente) {
      return res.status(200).send(novoCliente)
    } else {
      console.log('Aconteceu um erro ao criar um novo cliente: ', Error)
      res
        .status(500)
        .send(
          'Aconteceu um erro ao criar um novo cliente, aguarde e tente novamente',
        )
    }
  })
}
