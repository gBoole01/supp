import validateEnv from './lib/validateEnv'
import App from './app'
import AuthenticationController from './services/authentication/authentication.controller'
import Logger from './lib/logger'

Logger.info(`🚀 App starting in ${process.env.NODE_ENV} mode ! Warming up...`)
validateEnv()

const app = new App([new AuthenticationController()])

app.connectToDatabase().then(() => {
  app.listen()
})
