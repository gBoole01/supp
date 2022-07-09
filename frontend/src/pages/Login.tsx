import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import AuthenticationService from '../services/authentication/authentication.service'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [serverError, setServerError] = useState('')
  const [errors, setErrors] = useState({
    server: false,
    email: false,
    emailFormat: false,
    password: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const userContext = useUserContext()
  if (!userContext) return <div>No User Context</div>
  const { login } = userContext

  const navigate = useNavigate()

  const resetFormValues = () => {
    setEmail('')
    setPassword('')
  }

  const handleValidation = () => {
    const tempErrors = {
      server: false,
      email: false,
      emailFormat: false,
      password: false,
    }
    let isValid = true

    if (email.length <= 0) {
      tempErrors.email = true
      isValid = false
    }

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      tempErrors.emailFormat = true
      isValid = false
    }

    if (password.length <= 0) {
      tempErrors.password = true
      isValid = false
    }

    setErrors({ ...tempErrors })
    return isValid
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValidForm = handleValidation()
    if (isValidForm) {
      setIsSubmitting(true)
      const { data, error } = await AuthenticationService.login(email, password)
      setIsSubmitting(false)
      if (error) {
        setErrors({
          server: true,
          email: false,
          emailFormat: false,
          password: false,
        })
        setServerError(error)
      }
      if (data) {
        login(data.token)
        resetFormValues()
        navigate('/')
      }
    }
  }

  return (
    <>
      <form
        className="d-flex flex-column gap-4 align-items-center"
        onSubmit={handleSubmit}
      >
        {errors?.server && <p>{serverError}</p>}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors?.email && <p>Email is empty</p>}
          {!errors?.email && errors?.emailFormat && <p>Wrong mail format</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors?.password && <p>Password is empty</p>}
        </div>
        <button
          type="submit"
          data-bs-dismiss="modal"
          className="btn btn-secondary"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <a href="/signup">No Account ? Register</a>
    </>
  )
}

export default Login
