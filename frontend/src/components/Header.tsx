import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import AuthenticationService from '../services/authentication/authentication.service'

const Header = () => {
  const userContext = useUserContext()
  if (!userContext) return <div>No User Context</div>
  const { user, logout } = userContext

  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error, data } = await AuthenticationService.logout(user.token)
    if (error) console.error(error)
    if (data) {
      logout()
      navigate('/signin')
    }
  }

  return (
    <header className="p-2 border-bottom">
      <nav className="d-flex gap-2">
        <a href="/">Home</a>
        {!user.token && (
          <>
            <a href="/signin">Sign In</a>
            <a href="/signup">Sign Up</a>
          </>
        )}
        {user.token && (
          <div role="button" onClick={handleLogout}>
            Log Out
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
