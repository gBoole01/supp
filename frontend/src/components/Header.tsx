import AuthenticationService from '../services/authentication/authentication.service'

const Header = () => {
  const logout = async () => {
    const { error, data } = await AuthenticationService.logout()
    if (error) console.error(error)
    console.log(data)
  }

  return (
    <header className="p-2 border-bottom">
      <nav className="d-flex gap-2">
        <a href="/">Home</a>
        <a href="/signin">Sign In</a>
        <a href="/signup">Sign Up</a>
        <div role="button" onClick={logout}>
          Log Out
        </div>
      </nav>
    </header>
  )
}

export default Header
