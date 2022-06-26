import { cleanEnv, port, str } from 'envalid'
import 'dotenv/config'

export default function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGODB_USER: str(),
    MONGODB_PASSWORD: str(),
    MONGODB_URL: str(),
    TOKEN_SECRET_KEY: str(),
  })
}
