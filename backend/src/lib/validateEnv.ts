import { cleanEnv, num, port, str, url } from 'envalid'
import 'dotenv/config'
import Logger from './logger'

export default function validateEnv() {
  Logger.debug('⏳ Validating Environment Variables...')
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    REACT_APP_DOMAIN: url(),
    COOKIE_SECRET: str(),
    MONGODB_USER: str(),
    MONGODB_PASSWORD: str(),
    MONGODB_URL: str(),
    JWT_SECRET: str(),
    REFRESH_TOKEN_EXPIRACY_SECONDS: num(),
    REFRESH_TOKEN_EXPIRACY_MINUTES: num(),
    REFRESH_TOKEN_EXPIRACY_HOURS: num(),
    REFRESH_TOKEN_EXPIRACY_DAYS: num(),
    SESSION_SECRET: str(),
    SESSION_EXPIRACY_SECONDS: num(),
    SESSION_EXPIRACY_MINUTES: num(),
  })
}
