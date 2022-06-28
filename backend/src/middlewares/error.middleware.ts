import { Request, Response } from 'express'
import HTTPException from '../exceptions/HTTPException'

function errorMiddleware(
  error: HTTPException,
  _request: Request,
  response: Response,
) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  response.status(status).send(message)
}

export default errorMiddleware
