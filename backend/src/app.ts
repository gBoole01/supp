import * as express from 'express'
import mongoose from 'mongoose'
import dbConnectionURL from './config/db'
import Controller from './interfaces/Controller.interface'

class App {
  public app: express.Application

  private port: number

  private dbConnectionURL: string

  constructor(controllers?: Controller[], port?: number) {
    this.app = express()
    this.port = port || 5000
    this.dbConnectionURL = dbConnectionURL

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    console.log('middlewares init')
  }

  private initializeControllers(controllers?: Controller[]) {
    console.log('controllers init')
  }

  private initializeErrorHandling() {
    console.log('errorHandling init')
  }

  public async connectToDatabase() {
    const db = await mongoose.connect(this.dbConnectionURL)
    console.log(`MongoDB connected: ${db.connection.host}`)
  }

  public listen() {
    this.app.listen(this.port, () =>
      console.log(`App started ! Listening on port ${this.port}`),
    )
  }
}

export default App
