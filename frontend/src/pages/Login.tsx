import { useState } from 'react'
import AuthenticationService from '../services/authentication/authentication.service'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({
    email: false,
    emailFormat: false,
    password: false,
  })

  const resetFormValues = () => {
    setEmail('')
    setPassword('')
  }

  const handleValidation = () => {
    const tempErrors = {
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
      const { data, error } = await AuthenticationService.login(email, password)
      if (error) {
        // TODO => Handle API Errors
        console.error(error)
      }
      // TODO => Handle Valid Login
      console.log(data)
      resetFormValues()
    }
  }

  return (
    <>
      <form
        className="d-flex flex-column gap-4 align-items-center"
        onSubmit={handleSubmit}
      >
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
          Login
        </button>
      </form>
      <a href="/signup">No Account ? Register</a>
    </>
  )
}

export default Login
