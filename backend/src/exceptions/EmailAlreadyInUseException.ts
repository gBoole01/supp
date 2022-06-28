import HTTPException from './HTTPException'

export default class EmailAlreadyInUseException extends HTTPException {
  constructor(email: string) {
    super(400, `Email ${email} already used`)
  }
}
