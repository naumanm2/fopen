import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import Logout from './components/Logout'
import Createnew from './components/Createnew'
import './index.css'
import Notif from './components/Notif'
import Togglable from './components/Togglable'

import { connect } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import { addBlog, initialBlogs } from './reducers/blogReducer'
import { login, initialLogin } from './reducers/loginReducer'


const App = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogRef = useRef()

  const handleLogin = async (event) => {
   event.preventDefault()
   try {
     props.login(username, password)
     props.setNotification(`${username} logged in`, true, 5)
     setUsername('')
     setPassword('')
   } catch (e) {
     console.log(e)
     props.setNotification('wrong credentials', false, 5)
 }
}


  const postBlog = (blog) => {
    try {
      blogRef.current.toggleVisibility()
      props.addBlog(blog, props.user)
      props.setNotification(`a new blog ${blog.title} by ${blog.author} added`, true, 5)
    } catch (exception) {
      props.setNotification('wrong credentials', false, 5)
    }
  }

  useEffect(() => {
    props.initialBlogs()
  }, [])

  useEffect(() => {
    props.initialLogin()
  }, [])


  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogRef}>
      <Createnew
        user={props.user}
        createNew={postBlog}
      />
    </Togglable>
  )

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

  if (props.user === null) {
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
      <Logout   />
      <Blog />

      {blogForm()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }

}
const mapDispatchToProps = {
  initialLogin,
  initialBlogs,
  login,
  setNotification,
  addBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
