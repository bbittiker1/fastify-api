
// Require external modules
const mongoose = require('mongoose')

const routes = require('./src/routes')

// Import Swagger Options
const swagger = require('./src/config/swagger')

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

// Connect to DB')
mongoose.connect('mongodb://localhost/mycargarage')
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))

routes.forEach((route, index) => {
 fastify.route(route)
})


// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3010)
    fastify.swagger()
	fastify.log.info('listening on ${fastify.server.address().port}')
    fastify.log.info('server listening on ${fastify.server.address().port}')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
