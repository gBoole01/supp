import { NextFunction, Request, Response, Router } from 'express'
import Controller from '../../interfaces/Controller.interface'
import AuthenticationService from './authentication.service'
import validationMiddleware from '../../middlewares/validation.middleware'
import CreateUserDTO from './CreateUserDTO'

class AuthenticationController implements Controller {
  public path = '/auth'

  public router = Router()

  private authenticationService = new AuthenticationService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDTO),
      AuthenticationController.registration,
    )
  }

  private static registration = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const userData: CreateUserDTO = request.body
    try {
      const user = await AuthenticationService.register(userData)
      response.send(user)
    } catch (error) {
      next(error)
    }
  }
}

export default AuthenticationController
