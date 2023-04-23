import fastify from "fastify";

const app = fastify()

app.get('/users', async () => {

})

app.listen({
  port: 3333
})
.then(() => {
  console.log('HTTP SERVER IS RUNNING')
})