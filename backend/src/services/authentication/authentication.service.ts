import * as jwt from 'jsonwebtoken'
import User from '../../models/User'
import Logger from '../../lib/logger'
import CreateUserDTO from './CreateUserDTO'
import { UserI } from '../../interfaces/User.interface'
import WrongRefreshTokenException from '../../exceptions/WrongRefreshTokenException'

type RefreshTokenPayload = {
  firstName: string
  lastName: string
  authStrategy: string
  points: number
  _id: string
  username: string
  salt: string
  hash: string
  __v: number
  iat: number
  exp: number
}

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

  public static async authenticate(userId: string) {
    const user = await User.findById(userId)

    const token = AuthenticationService.getToken(user)
    const refreshToken = AuthenticationService.getRefreshToken(user)

    user.refreshToken.push({ refreshToken })
    user.save()
    Logger.info(`🟢 ${user.firstName} is connected`)

    return { token, refreshToken }
  }

  public static async disconnect(userId: string, refreshToken: string) {
    const user = await User.findById(userId)

    const tokenIndex = user.refreshToken.findIndex(
      (item) => item.refreshToken === refreshToken,
    )

    if (tokenIndex !== -1) {
      user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
    }
    user.save()

    Logger.info(`🔴 ${user.firstName} has disconnected`)
  }

  public static async refreshToken(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    ) as RefreshTokenPayload
    const user = await User.findOne({ _id: payload._id })

    if (user) {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken,
      )

      if (tokenIndex === -1) throw new WrongRefreshTokenException()

      const token = AuthenticationService.getToken(user)
      const newRefreshToken = AuthenticationService.getRefreshToken(user)
      user.refreshToken[tokenIndex].refreshToken = newRefreshToken
      user.save()

      return { token, newRefreshToken }
    }

    return { token: undefined, newRefreshToken: undefined }
  }

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
      REFRESH_TOKEN_SECRET,
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

    return jwt.sign(user.toJSON(), REFRESH_TOKEN_SECRET, {
      expiresIn,
    })
  }
}

export default AuthenticationService
