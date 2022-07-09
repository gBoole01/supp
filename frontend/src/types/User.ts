interface UserDetailsI {
  _id: string
  firstName: string
  lastName: string
  authStrategy: string
  points: number
  username: string
}

interface UserI {
  token: string
  details: UserDetailsI | null
}

type UserContextType = {
  user: UserI
  login: (token: string) => void
  logout: () => void
  setUserDetails: (details: UserDetailsI | null) => void
}

export type { UserDetailsI, UserI, UserContextType }
