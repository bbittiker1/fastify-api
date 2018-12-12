
// Require external modules
const mongoose = require('mongoose');

const routes = require('./src/routes');

// Import Swagger Options
const swagger = require('./src/config/swagger');


const myport = 3000;

swagger.options.swagger.host = `localhost:${myport}`;

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

// Connect to DB')
mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true })
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err));

routes.forEach((route, index) => {
 fastify.route(route)
});

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Add CORS
fastify.addHook(
    'preHandler',
    (req, reply, next) => {
        reply.header('Access-Control-Allow-Credentials', "true");

        // This can be locked down to domain/origin
        reply.header('Access-Control-Allow-Origin', "*");
        next();
    }
);

// Run the server!
const start = async () => {
  try {
    await fastify.listen(myport);
    fastify.swagger();
	fastify.log.info('listening on ${fastify.server.address().port}');
    fastify.log.info('server listening on ${fastify.server.address().port}');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1)
  }
};
start();
