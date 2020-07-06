import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'
import Logout from './components/Logout'
import Createnew from './components/Createnew'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [author, setAuthor] = useState("")

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

  const postBlog = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    const blog = ({
      title: title,
      author: author,
      user: user,
      url: url
    })
    try {
      await blogService.createBlog(blog)
      setAuthor("")
      setUrl("")
      setTitle("")
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
      <Createnew
        user={user}
        authorChange={({target}) => setAuthor(target.value)}
        titleChange={({target}) => setTitle(target.value)}
        urlChange={({target}) => setUrl(target.value)}
        createNew={postBlog}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
