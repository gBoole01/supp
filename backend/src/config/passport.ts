/* eslint-disable @typescript-eslint/no-explicit-any */
import { Strategy as LocalStrategy } from 'passport-local'
import { compare } from 'bcrypt'
import User from '../models/User'

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username })
      if (!user) return done(null, false)
      const passwordMatch = await compare(password, user.password)
      if (!passwordMatch) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  },
)

const serializeUser = (user: any, done: any) => {
  done(null, user.id)
}

const deserializeUser = (id: string, done: any) => {
  User.findById(id, (error: any, user: any) => done(error, user))
}

export { localStrategy, serializeUser, deserializeUser }
