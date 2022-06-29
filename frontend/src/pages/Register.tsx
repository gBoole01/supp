import React, { useState } from 'react'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    emailFormat: false,
    password: false,
    passwordConfirm: false,
  })

  const handleValidation = () => {
    const tempErrors = {
      name: false,
      email: false,
      emailFormat: false,
      password: false,
      passwordConfirm: false,
    }
    let isValid = true

    if (name.length <= 0) {
      tempErrors.name = true
      isValid = false
    }

    if (email.length <= 0) {
      tempErrors.email = true
      isValid = false
    }

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      tempErrors.emailFormat = true
      isValid = false
    }

    if (password.length <= 5) {
      tempErrors.password = true
      isValid = false
    }

    if (password !== passwordConfirm) {
      tempErrors.passwordConfirm = true
      isValid = false
    }

    setErrors({ ...tempErrors })
    return isValid
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValidForm = handleValidation()
    if (isValidForm) {
      // const response = await fetch('https://localhost:5000/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // })
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
    }
  }

  return (
    <>
      <form
        className="d-flex flex-column gap-4 align-items-center"
        onSubmit={handleSubmit}
        id="register-form"
      >
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors?.name && <p>This field is empty</p>}
        </div>
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
          {errors?.email && <p>This field is empty</p>}
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
          {errors?.password && <p>Password length must be 6+ char.</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="passwordConfirm">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {errors?.passwordConfirm && <p>Please enter the same password</p>}
        </div>

        <button type="submit" className="btn btn-secondary">
          Register
        </button>
      </form>
      <a href="/signin">Have an Account ? Login</a>
    </>
  )
}

export default Register
