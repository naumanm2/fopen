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

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogRef = useRef()

  const dispatch = useDispatch()

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
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      dispatch(setNotification(`${user.username} logged in`, true, 5))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials', false, 5))
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
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, true, 5))
    } catch (exception) {
      dispatch(setNotification('wrong credentials', false, 5))
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
      await blogService.getAll().then(blogs =>
        setBlogs( blogs.sort(sortblogs) )
      )
    } catch (exception) {
      dispatch(setNotification('wrong credentials', false, 5))
    }
  }

  const deleteblog = async (blog) => {
    blogService.setToken(user.token)
    try {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteblog(blog.id)
        await blogService.getAll().then(blogs =>
          setBlogs( blogs.sort(sortblogs) )
        )
      }
    } catch (exception) {
      dispatch(setNotification('wrong credentials', false, 5))
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
        <Notif />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notif />
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
