import fastify from 'fastify'
import { corretoresRoutes } from './routes/corretores'
import { clientesRouter } from './routes/clientes'

const app = fastify()

// Register server de plugin no fastify para poder consumir dados de outra parte do código...
// é possível passar um objeto de configurações, como segundo argumento, que aceita o prefix:
// ele serve para deixar um prefixo na rota, /users/corretores : exemplo
app.register(corretoresRoutes, {
  prefix: 'users',
})

app.register(clientesRouter, {
  prefix: 'users',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP SERVER IS RUNNING')
  })
