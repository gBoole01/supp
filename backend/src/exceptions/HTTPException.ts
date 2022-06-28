import Logger from '../lib/logger'

class HTTPException extends Error {
  status: number

  message: string

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
    Logger.error(`⛔ Error ${status}: ${message}`)
  }
}

export default HTTPException
