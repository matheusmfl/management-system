import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function corretoresRoutes(app: FastifyInstance) {
  app.get('/corretores', async (req, res) => {
    const corretores = await prisma.corretor.findMany()
    console.log('olámundo')

    return corretores
  })
}
