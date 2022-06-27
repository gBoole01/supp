import validateEnv from './lib/validateEnv'
import App from './app'

validateEnv()

const app = new App()

app.connectToDatabase().then(() => {
  app.listen()
})
