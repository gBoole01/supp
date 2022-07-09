import axios from 'axios'

const AUTHENTICATION_ENDPOINT = `${import.meta.env.VITE_API_URL}/auth`

type RegisterResponse = {
  success: boolean
  token: string
}

type LoginResponse = {
  success: boolean
  token: string
}

type LogoutResponse = {
  success: boolean
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
        { withCredentials: true },
      )

      if (data.token) localStorage.setItem('user', JSON.stringify(data))

      return {
        data,
        error: null,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          error: error.message,
        }
      }
      return {
        data: null,
        error: 'Something went wrong',
      }
    }
  }

  static async login(email: string, password: string) {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${AUTHENTICATION_ENDPOINT}/login/password`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )

      if (data.token) localStorage.setItem('user', JSON.stringify(data))

      return {
        data,
        error: null,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          error: error.message,
        }
      }
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
        {
          headers: AuthenticationService.getAuthHeader(),
          withCredentials: true,
        },
      )

      localStorage.removeItem('user')

      return {
        data: response.data,
        error: null,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          error: error.message,
        }
      }
      return {
        data: null,
        error: 'Something went wrong',
      }
    }
  }

  static getCurrentUser() {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    return JSON.parse(userStr)
  }

  static getAuthHeader() {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` }
      }
      return { Authorization: '' }
    }
    return { Authorization: '' }
  }
}

export default AuthenticationService
