import { Schema, model } from 'mongoose'
import * as passportLocalMongoose from 'passport-local-mongoose'
import { SessionI, UserI } from '../interfaces/User.interface'

const Session = new Schema<SessionI>({
  refreshToken: {
    type: String,
    default: '',
  },
})

const UserSchema = new Schema<UserI>({
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  authStrategy: {
    type: String,
    default: 'local',
  },
  points: {
    type: Number,
    default: 50,
  },
  refreshToken: {
    type: [Session],
  },
})

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newRet: any = {
      ...ret,
      refreshToken: undefined,
    }
    return newRet
  },
})

UserSchema.plugin(passportLocalMongoose)

const User = model<UserI>('User', UserSchema)

export default User
