import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import AuthenticationService from '../services/authentication/authentication.service'
import { UserContextType, UserDetailsI } from '../types/User'

const UserContext = createContext<UserContextType | null>(null)

const initialState = {
  token: '',
  details: null,
}

type UserState = {
  token: string
  details: UserDetailsI | null
}

type Props = {
  children: ReactNode
}

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserState>(initialState)

  const login = (token: string) => {
    setUser((oldValues) => ({ ...oldValues, token }))
  }

  const logout = () => {
    setUser(() => ({ details: null, token: '' }))
  }

  const setUserDetails = (details: UserDetailsI | null) => {
    setUser((oldValues) => ({ ...oldValues, details }))
  }

  const verifyUser = useCallback(async () => {
    if (user.token !== '') {
      const { data, error } = await AuthenticationService.verifyUser()
      if (error) {
        console.error(error)
      }
      if (data) {
        setUser((oldValues) => ({ ...oldValues, token: data.token }))
      }

      setTimeout(verifyUser, 5 * 60 * 1000)
    }
  }, [setUser])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  const value = {
    user,
    login,
    logout,
    setUserDetails,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUserContext = () => useContext(UserContext)

export { UserProvider, useUserContext }
