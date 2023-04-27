import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import * as z from 'zod'
import { randomUUID } from 'crypto'

const userCorretorSchema = z.object({
  name: z.string(),
  username: z.string(),
  isAdmin: z.boolean(),
})
type UserCorretor = z.infer<typeof userCorretorSchema>

export async function corretoresRoutes(app: FastifyInstance) {
  // Capturar corretores
  app.get('/corretores', async (req, res) => {
    const corretores = await prisma.corretor.findMany()
    console.log('olámundo')

    return corretores
  })

  app.get('/corretores/:username', async (req, res) => {
    const getCorretoresParamsSchema = z.object({
      username: z.string(),
    })

    const { username } = getCorretoresParamsSchema.parse(req.params)

    const corretor = await prisma.corretor.findFirst({
      where: { username },
    })

    if (corretor) {
      console.log('corretor achado!')
      return res.send(corretor)
    } else {
      return res
        .status(404)
        .send({ message: 'Corretor não encontrado em nosso sistema' })
    }
  })
  // Cadastro de corretor
  app.post('/corretores', async (req, reply) => {
    try {
      const userCorretorData: UserCorretor = userCorretorSchema.parse(req.body)

      const { isAdmin, name, username } = userCorretorData

      const novoCorretor = await prisma.corretor.create({
        data: {
          id: randomUUID(),
          isAdmin,
          name,
          username,
        },
      })

      reply.send(novoCorretor)
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('username')) {
        console.log(
          'O nome de usuário já está em uso. Por favor, tente novamente com um nome de usuário diferente.',
        )
      } else {
        console.log('Ocorreu um erro ao criar o corretor:', error)
      }
      reply
        .status(500)
        .send(
          'Ocorreu um erro ao criar o corretor. Por favor, tente novamente.',
        )
    }
  })
}
