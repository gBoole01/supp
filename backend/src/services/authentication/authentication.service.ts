import * as jwt from 'jsonwebtoken'
import User from '../../models/User'
import Logger from '../../lib/logger'
import CreateUserDTO from './CreateUserDTO'
import { UserI } from '../../interfaces/User.interface'

class AuthenticationService {
  public static async register(userData: CreateUserDTO) {
    const user = await User.register(
      new User({ username: userData.email }),
      userData.password,
    )
    user.firstName = userData.name

    const token = AuthenticationService.getToken(user)
    const refreshToken = AuthenticationService.getRefreshToken(user)
    user.refreshToken.push({ refreshToken })

    user.save()
    Logger.info(`📢 ${user.firstName} just created an account ! 🎉`)

    return { token, refreshToken }
  }

  // public static async authenticate(user: Express.User) {
  //   const dbUser = await User.findById(user)
  //   console.log(user)
  //   console.log(dbUser)
  //   const token = AuthenticationService.getToken(dbUser)
  //   const refreshToken = AuthenticationService.getRefreshToken(dbUser)

  //   return { token, refreshToken }
  // }

  private static getToken(user: UserI) {
    const {
      JWT_SECRET,
      SESSION_EXPIRACY_SECONDS: seconds,
      SESSION_EXPIRACY_MINUTES: minutes,
    } = process.env

    const expiresIn = parseInt(seconds, 10) * parseInt(minutes, 10)

    return jwt.sign(user.toJSON(), JWT_SECRET, {
      expiresIn,
    })
  }

  private static getRefreshToken(user: UserI) {
    const {
      JWT_SECRET,
      REFRESH_TOKEN_EXPIRACY_SECONDS: seconds,
      REFRESH_TOKEN_EXPIRACY_MINUTES: minutes,
      REFRESH_TOKEN_EXPIRACY_HOURS: hours,
      REFRESH_TOKEN_EXPIRACY_DAYS: days,
    } = process.env

    const expiresIn =
      parseInt(seconds, 10) *
      parseInt(minutes, 10) *
      parseInt(hours, 10) *
      parseInt(days, 10)

    return jwt.sign(user.toJSON(), JWT_SECRET, {
      expiresIn,
    })
  }
}

export default AuthenticationService
