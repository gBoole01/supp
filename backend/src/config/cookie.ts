import { CookieOptions } from 'express'

const {
  REFRESH_TOKEN_EXPIRACY_SECONDS: seconds,
  REFRESH_TOKEN_EXPIRACY_MINUTES: minutes,
  REFRESH_TOKEN_EXPIRACY_HOURS: hours,
  REFRESH_TOKEN_EXPIRACY_DAYS: days,
} = process.env

const maxAge =
  parseInt(seconds, 10) *
  parseInt(minutes, 10) *
  parseInt(hours, 10) *
  parseInt(days, 10) *
  1000

const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  signed: true,
  maxAge,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
}

export default cookieConfig
