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

type VerifyUserResponse = {
  success: boolean
  token: string
}

type FetchUserDetailsResponse = {
  _id: string
  firstName: string
  lastName: string
  authStrategy: string
  points: number
  username: string
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

  static async logout(userToken: string) {
    try {
      const { data } = await axios.post<LogoutResponse>(
        `${AUTHENTICATION_ENDPOINT}/logout`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${userToken}` },
        },
      )

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

  static async verifyUser() {
    try {
      const { data } = await axios.post<VerifyUserResponse>(
        `${AUTHENTICATION_ENDPOINT}/refreshToken`,
        {},
        {
          withCredentials: true,
        },
      )

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

  static async fetchUserDetails(userToken: string) {
    try {
      const { data } = await axios.post<FetchUserDetailsResponse>(
        `${AUTHENTICATION_ENDPOINT}/me`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } },
      )

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
}

export default AuthenticationService
