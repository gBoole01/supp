import * as morgan from 'morgan'
import { IncomingMessage } from 'http'
import Logger from '../lib/logger'

interface Request extends IncomingMessage {
  body: {
    query: string
  }
}

const stream: morgan.StreamOptions = {
  write: (message) => Logger.http(message),
}

const registerGrapQLToken = () => {
  morgan.token('graphql-query', (req: Request) => {
    if (!req.body.query) return ''
    return `\nGraphQL ${req.body.query}`
  })
}

registerGrapQLToken()

const loggerMiddleware = morgan(
  '➡️  :method :url :status :res[content-length] - :response-time ms :graphql-query',
  { stream },
)

export default loggerMiddleware
