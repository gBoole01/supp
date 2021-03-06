import { NextFunction, Request, Response, Router } from 'express'
import * as passport from 'passport'
import cookieConfig from '../../config/cookie'
import Controller from '../../interfaces/Controller.interface'
import { RequestWithUser } from '../../interfaces/User.interface'
import AuthenticationService from './authentication.service'
import validationMiddleware from '../../middlewares/validation.middleware'
import CreateUserDTO from './CreateUserDTO'
import AuthenticateUserDTO from './AuthenticateUserDTO'
import WrongRefreshTokenException from '../../exceptions/WrongRefreshTokenException'

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
    this.router.post(
      `${this.path}/refreshToken`,
      AuthenticationController.refreshToken,
    )
    this.router.post(
      `${this.path}/me`,
      passport.authenticate('jwt', { session: false }),
      AuthenticationController.getUserDetails,
    )
    this.router.post(
      `${this.path}/logout`,
      passport.authenticate('jwt', { session: false }),
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
      const { token, refreshToken } = await AuthenticationService.register(
        userData,
      )
      if (!token || !refreshToken) throw new WrongRefreshTokenException()

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
    const { user } = request

    try {
      const { token, refreshToken } = await AuthenticationService.authenticate(
        user._id,
      )
      response.cookie('refreshToken', refreshToken, cookieConfig)
      response.send({ success: true, token })
    } catch (error) {
      next(error)
    }
  }

  private static refreshToken = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
  ) => {
    const { signedCookies = {} } = request
    const { refreshToken } = signedCookies

    try {
      if (refreshToken) {
        const {
          token,
          newRefreshToken,
        } = await AuthenticationService.refreshToken(refreshToken)

        response.cookie('refreshToken', newRefreshToken, cookieConfig)
        response.send({ success: true, token })
      }
    } catch (error) {
      next(error)
    }
  }

  private static getUserDetails = (
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      response.send(request.user)
    } catch (error) {
      next(error)
    }
  }

  private static disconnection = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
  ) => {
    const { signedCookies = {} } = request
    const { refreshToken } = signedCookies

    try {
      await AuthenticationService.disconnect(request.user._id, refreshToken)

      response.clearCookie('refreshToken', cookieConfig)
      response.send({ success: true })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthenticationController
