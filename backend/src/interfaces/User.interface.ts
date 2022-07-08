import { PassportLocalDocument } from 'mongoose'

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

export { SessionI, UserI }
