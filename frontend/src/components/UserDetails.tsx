import { useCallback, useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import AuthenticationService from '../services/authentication/authentication.service'
import { UserDetailsI } from '../types/User'

const UserDetails = () => {
  const userContext = useUserContext()
  if (!userContext) return <div>No User Context</div>
  const { user, setUserDetails } = userContext

  const fetchUserDetails = useCallback(async () => {
    const { data, error } = await AuthenticationService.fetchUserDetails(
      user.token,
    )
    if (error) {
      console.error(error)
    }
    if (data) {
      const details = data as UserDetailsI
      setUserDetails(details)
    }
  }, [user.token])

  useEffect(() => {
    if (!user.details) fetchUserDetails()
  }, [user.details])

  if (!user.details) return <div>Something went wrong</div>

  const { firstName, lastName, authStrategy, points, username } = user.details
  return (
    <ul>
      <li>{firstName}</li>
      <li>{lastName}</li>
      <li>{authStrategy}</li>
      <li>{points}</li>
      <li>{username}</li>
    </ul>
  )
}
export default UserDetails
