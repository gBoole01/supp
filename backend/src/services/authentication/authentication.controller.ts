import { NextFunction, Request, Response, Router } from 'express'
import * as passport from 'passport'
import Controller from '../../interfaces/Controller.interface'
import AuthenticationService from './authentication.service'
import validationMiddleware from '../../middlewares/validation.middleware'
import CreateUserDTO from './CreateUserDTO'
import AuthenticateUserDTO from './AuthenticateUserDTO'
import AuthenticationFailureException from '../../exceptions/AuthenticationFailureException'

class AuthenticationController implements Controller {
  public path = '/auth'

  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDTO),
      AuthenticationController.registration,
    )
    this.router.post(
      `${this.path}/login/password`,
      validationMiddleware(AuthenticateUserDTO),
      passport.authenticate('local'),
      AuthenticationController.authentication,
    )
    this.router.post(
      `${this.path}/logout`,
      AuthenticationController.disconnection,
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

  private static authentication = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const { user } = request
    if (!user) next(new AuthenticationFailureException())
    response.send(user)
  }

  private static disconnection = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const { session } = request
    session.destroy((error) => {
      if (error) return next(error)
      response.clearCookie('connect.sid')
      return response.sendStatus(200)
    })
  }
}

export default AuthenticationController
