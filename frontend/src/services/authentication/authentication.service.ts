import axios from 'axios'

const AUTHENTICATION_ENDPOINT = `${import.meta.env.VITE_API_URL}/auth`

type RegisterResponse = {
  name: string
  email: string
  password: string
  _id: string
}

type LoginResponse = {
  name: string
  email: string
  password: string
  _id: string
}

type LogoutResponse = {
  _id: string
}

class AuthenticationService {
  static async register(name: string, email: string, password: string) {
    try {
      const { data } = await axios.post<RegisterResponse>(
        `${AUTHENTICATION_ENDPOINT}/register`,
        {
          name,
          email,
          password,
        },
      )

      return {
        data,
        error: null,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios Error: ${error.message}`)
        return {
          data: null,
          error: error.message,
        }
      }
      console.error(`Unexpected Error: ${error}`)
      return {
        data: null,
        error: 'Something went wrong',
      }
    }
  }

  static async login(email: string, password: string) {
    try {
      const response = await axios.post<LoginResponse>(
        `${AUTHENTICATION_ENDPOINT}/login/password`,
        {
          email,
          password,
        },
      )

      return {
        data: response.data,
        error: null,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios Error: ${error.message}`)
        return {
          data: null,
          error: error.message,
        }
      }
      console.error(`Unexpected Error: ${error}`)
      return {
        data: null,
        error: 'Something went wrong',
      }
    }
  }

  static async logout() {
    try {
      const response = await axios.get<LogoutResponse>(
        `${AUTHENTICATION_ENDPOINT}/logout`,
      )

      console.log(response)
      return {
        data: response.data,
        error: null,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios Error: ${error.message}`)
        return {
          data: null,
          error: error.message,
        }
      }
      console.error(`Unexpected Error: ${error}`)
      return {
        data: null,
        error: 'Something went wrong',
      }
    }
  }
}

export default AuthenticationService
