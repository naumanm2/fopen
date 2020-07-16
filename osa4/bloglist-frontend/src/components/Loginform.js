import React from 'react'
import PropTypes from 'prop-types'

  const LoginForm = ({
    username,
    password,
    usernameChange,
    passwordChange,
    handleLogin
  }) => {
    return (
      <div>
          <form onSubmit = {handleLogin}>
            <div>
              username
                <input
                value={username}
                onChange={usernameChange}
                />
              </div>
              <div>
                password
                  <input
                  value={password}
                  type="password"
                  onChange={passwordChange}
                />
              </div>
              <button type="submit">login</button>
            </form>
          </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  usernameChange: PropTypes.func.isRequired,
  passwordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
