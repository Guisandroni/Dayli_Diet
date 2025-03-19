import fastify from 'fastify'
import { appRoutes } from './routes/route'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

const app = fastify()

// Register CORS
app.register(cors, {
  origin: '*', // Permite todas as origens em desenvolvimento
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true
})

// Register Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: 'DayliDiet API',
      description: 'API for managing diet entries',
      version: '1.0.0'
    },
    host: 'localhost:3333',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
})

app.register(swaggerUi, {
  routePrefix: '/documentation'
})

app.register(appRoutes)

// Configurando o servidor para escutar em todas as interfaces
app.listen({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3333,
    host: '0.0.0.0' // Importante: escuta em todas as interfaces
}).then(() => {
    console.log('Server online')
})
