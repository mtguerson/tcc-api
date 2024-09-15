import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import { Express } from 'express'

const swaggerSetup = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

export default swaggerSetup
