import { NextFunction, Request, Response, Router } from 'express'
import * as passport from 'passport'
import cookieConfig from '../../config/cookie'
import Controller from '../../interfaces/Controller.interface'
import { RequestWithUser } from '../../interfaces/User.interface'
import AuthenticationService from './authentication.service'
import validationMiddleware from '../../middlewares/validation.middleware'
import CreateUserDTO from './CreateUserDTO'
import AuthenticateUserDTO from './AuthenticateUserDTO'

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
      passport.authenticate('local', { session: false }),
      AuthenticationController.authentication,
    )
    // this.router.get(
    //   `${this.path}/logout`,
    //   AuthenticationController.disconnection,
    // )
  }

  private static registration = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const userData: CreateUserDTO = request.body
    try {
      const { token, refreshToken } = await AuthenticationService.register(
        userData,
      )

      response.cookie('refreshToken', refreshToken, cookieConfig)
      response.send({ success: true, token })
    } catch (error) {
      next(error)
    }
  }

  private static authentication = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { user } = request
      const { token, refreshToken } = await AuthenticationService.authenticate(
        user._id,
      )
      response.cookie('refreshToken', refreshToken, cookieConfig)
      response.send({ success: true, token })
    } catch (error) {
      next(error)
    }
  }

  // private static disconnection = async (
  //   request: Request,
  //   response: Response,
  //   // next: NextFunction,
  // ) => {
  //   console.log(request.session)
  //   console.log(request.user)
  //   delete request.user
  //   delete request.session
  //   response.clearCookie('connect.sid')
  //   return response.sendStatus(200)
  // }
}

export default AuthenticationController
