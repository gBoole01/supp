import HTTPException from './HTTPException'

export default class WrongRefreshTokenException extends HTTPException {
  constructor() {
    super(401, `Wrong Refresh Token`)
  }
}
