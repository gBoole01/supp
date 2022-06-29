import HTTPException from './HTTPException'

export default class AuthenticationFailureException extends HTTPException {
  constructor() {
    super(500, `Something went wrong during authentication`)
  }
}
