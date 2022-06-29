import { hash } from 'bcrypt'
import User from '../../models/User'
import Logger from '../../lib/logger'
import CreateUserDTO from './CreateUserDTO'
import EmailAlreadyInUseException from '../../exceptions/EmailAlreadyInUseException'

class AuthenticationService {
  public static async register(userData: CreateUserDTO) {
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      throw new EmailAlreadyInUseException(userData.email)
    }

    const hashedPassword = await hash(userData.password, 10)
    const user = new User({
      ...userData,
      password: hashedPassword,
    })
    user.save()
    Logger.info(`📢 ${user.name} just created an account ! 🎉`)

    return {
      name: user.name,
      email: user.email,
    }
  }
}

export default AuthenticationService
