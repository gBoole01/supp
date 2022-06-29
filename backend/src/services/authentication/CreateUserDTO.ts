import { IsEmail, IsString } from 'class-validator'

class CreateUserDTO {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}

export default CreateUserDTO
