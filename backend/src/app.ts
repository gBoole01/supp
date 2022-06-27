import * as express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import Schema from './schemas/schema'
import dbConnectionURL from './config/db'
import Logger from './lib/logger'
import loggerMiddleware from './middlewares/logger.middleware'

class App {
  public app: express.Application

  private port: number

  private dbConnectionURL: string

  constructor(port?: number) {
    this.app = express()
    this.port = port || 5000
    this.dbConnectionURL = dbConnectionURL

    this.initializeMiddlewares()
    this.initializeGraphQL()
  }

  private initializeMiddlewares() {
    Logger.debug('⏳ Initializing Middlewares...')
    this.app.use(bodyParser.json())
    this.app.use(loggerMiddleware)
  }

  private initializeGraphQL() {
    Logger.debug('⏳ Initializing GraphQL...')
    this.app.use(
      '/graphql',
      graphqlHTTP({
        schema: Schema,
        graphiql: process.env.NODE_ENV === 'development',
      }),
    )
  }

  public async connectToDatabase() {
    Logger.debug('⏳ Connecting to Database...')
    try {
      const db = await mongoose.connect(this.dbConnectionURL)
      Logger.info(`✅ MongoDB connected: ${db.connection.host}`)
    } catch {
      Logger.error('⚠️ Connection to Database failed')
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(
        `🚀 App started in ${process.env.NODE_ENV} mode ! Listening on port ${this.port}...`,
      )
    })
  }
}

export default App
