import Logger from '../../lib/logger'
import CreateUserDTO from './CreateUserDTO'

class AuthenticationService {
  public static async register(userData: CreateUserDTO) {
    Logger.debug(userData)
    return true
  }
}

export default AuthenticationService
