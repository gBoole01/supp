import { PassportLocalDocument } from 'mongoose'
import { Request } from 'express'

interface SessionI {
  refreshToken: string
}

interface UserI extends PassportLocalDocument {
  _id: string
  firstName: string
  lastName: string
  authStrategy: string
  points: number
  refreshToken: SessionI[]
}

interface UserRequestI {
  _id: string
  firstName: string
  lastName: string
  authStrategy: string
  points: number
  username: string
  refreshToken: string
  salt: string
  hash: string
  __v: number
}

interface RequestWithUser extends Request {
  user: UserRequestI
}

export { SessionI, UserI, RequestWithUser }
