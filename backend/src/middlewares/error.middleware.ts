import { Request, Response, NextFunction } from 'express'
import Logger from '../lib/logger'
import HTTPException from '../exceptions/HTTPException'

function errorMiddleware(
  error: HTTPException,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  Logger.error(`⛔ Error ${status}: ${message}`)
  response.status(status).send({ status, message })
}

export default errorMiddleware
