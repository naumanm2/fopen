import React from 'react'
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

export default LoginForm
