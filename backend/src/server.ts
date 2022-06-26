import validateEnv from './utils/validateEnv'
import App from './app'

validateEnv()

const app = new App([])

app.connectToDatabase().then(() => {
  app.listen()
})
