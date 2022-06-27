import * as winston from 'winston'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const winstonLevel = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white',
}

winston.addColors(colors)

type Info = {
  timestamp: string
  level: string
  message: string
}

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, message }: Info) =>
      `${timestamp} [${level}]: ${message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'backend/logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'backend/logs/combined.log' }),
]

const Logger = winston.createLogger({
  level: winstonLevel(),
  levels,
  format,
  transports,
})

export default Logger
