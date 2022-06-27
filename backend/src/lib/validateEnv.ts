import { cleanEnv, port, str } from 'envalid'
import 'dotenv/config'
import Logger from './logger'

export default function validateEnv() {
  Logger.debug('⏳ Validating Environment Variables...')
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGODB_USER: str(),
    MONGODB_PASSWORD: str(),
    MONGODB_URL: str(),
    TOKEN_SECRET_KEY: str(),
  })
}
