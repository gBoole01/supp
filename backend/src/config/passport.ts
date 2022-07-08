import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/User'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const jwtStrategy = new JWTStrategy(opts, (jwt_payload, done) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  User.findOne({ _id: jwt_payload._id }, (err: any, user: any) => {
    if (err) return done(err, false)
    if (!user) return done(null, false)
    return done(null, user)
  })
})

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  User.authenticate(),
)

const serializeUser = () => {
  User.serializeUser()
}

const deserializeUser = () => {
  User.deserializeUser()
}

export { jwtStrategy, localStrategy, serializeUser, deserializeUser }
