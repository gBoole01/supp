import * as express from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import HTTPException from '../exceptions/HTTPException'

export default function validationMiddleware(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any,
  skipMissingProperties = false,
): express.RequestHandler {
  return async (req, _res, next) => {
    const errors = await validate(plainToInstance(type, req.body), {
      skipMissingProperties,
    })
    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints))
        .join(', ')

      const exception = new HTTPException(400, message)
      next(exception)
    }
    next()
  }
}
