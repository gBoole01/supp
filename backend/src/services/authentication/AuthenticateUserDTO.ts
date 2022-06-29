import { IsEmail, IsString } from 'class-validator'

class AuthenticateUserDTO {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export default AuthenticateUserDTO
