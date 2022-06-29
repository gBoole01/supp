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
    AUTH0_DOMAIN: str(),
    AUTH0_CLIENT_ID: str(),
    AUTH0_CLIENT_SECRET: str(),
    SESSION_SECRET: str(),
  })
}
