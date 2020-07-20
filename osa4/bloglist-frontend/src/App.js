import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'
import Logout from './components/Logout'
import Createnew from './components/Createnew'
import './index.css'
import Notif from './components/Notif'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(true)

  const blogRef = useRef()

  const sortblogs = (a, b) => {
    return b.likes - a.likes
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setSuccess(true)
      setUser(user)
      setErrorMessage(`${user.username} logged in`)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setSuccess(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
  }

  const postBlog = (blog) => {
    blogService.setToken(user.token)
    try {
      blogRef.current.toggleVisibility()
      blogService.createBlog(blog).then(blog => {
        setBlogs(blogs.concat(blog).sort(sortblogs))
      })
      setSuccess(true)
      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setSuccess(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const setlikes = async (blog) => {
    const newblog = ({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })

    try {
      await blogService.setlikes(blog.id, newblog)
      setSuccess(true)
      await blogService.getAll().then(blogs =>
        setBlogs( blogs.sort(sortblogs) )
      )
    } catch (exception) {
      setSuccess(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteblog = async (blog) => {
    blogService.setToken(user.token)
    try {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteblog(blog.id)
        setSuccess(true)
        await blogService.getAll().then(blogs =>
          setBlogs( blogs.sort(sortblogs) )
        )
      }
    } catch (exception) {
      setSuccess(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(sortblogs) )
    )
  }, [])

  useEffect(() => {
    const logUser = window.localStorage.getItem('loggedNoteappUser')
    if (logUser) {
      const user = JSON.parse(logUser)
      setUser(user)
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        usernameChange={({ target }) => setUsername(target.value)}
        passwordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogRef}>
      <Createnew
        user={user}
        createNew={postBlog}
      />
    </Togglable>
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notif
          msg={errorMessage}
          success={success}
        />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notif
        msg={errorMessage}
        success={success}
      />
      <Logout
        user={user}
        handleLogout={handleLogout}
      />
      {blogs.map(blog =>
        <Blog key={blog.id}
          userid={user.username}
          blog={blog}
          setlikes={setlikes}
          deleteblog={deleteblog}
        />
      )}
      {blogForm()}
    </div>
  )
}

export default App
