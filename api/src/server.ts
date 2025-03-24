import fastify from 'fastify'
import { appRoutes } from './routes/route'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

const app = fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true
})

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

app.listen({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3333,
    host: '0.0.0.0' 
}).then(() => {
    console.log('Server online')
})
