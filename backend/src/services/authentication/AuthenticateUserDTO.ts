import { IsString } from 'class-validator'

class AuthenticateUserDTO {
  @IsString()
  email: string

  @IsString()
  password: string
}

export default AuthenticateUserDTO
