import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'
import Logout from './components/Logout'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const logUser = window.localStorage.getItem('loggedNoteappUser')
    if (logUser) {
      const user = JSON.parse(logUser)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
        <LoginForm
          username={username}
          password={password}
          usernameChange={({ target }) => setUsername(target.value)}
          passwordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Logout
        user={user}
        handleLogout={handleLogout}
        />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
