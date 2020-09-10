import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

import LoginForm from './components/Loginform'
import Logout from './components/Logout'
import Createnew from './components/Createnew'
import './index.css'
import Notif from './components/Notif'
import Togglable from './components/Togglable'

import Container from '@material-ui/core/Container'

import { connect } from 'react-redux'

import {
  Switch, Route, Link, useRouteMatch, useHistory
} from "react-router-dom"

import { setNotification } from './reducers/notificationReducer'
import { addBlog, initialBlogs } from './reducers/blogReducer'
import { login, initialLogin } from './reducers/loginReducer'
import { getUsers } from './reducers/usersReducer'
import { setUserToShow } from './reducers/userReducer'


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

  useEffect(() => {
    props.getUsers()
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

  const match = useRouteMatch("/users/:id")
  const user = () => {
    const user = match ? match.params.id : null
    if (user) {
      return props.users.find(u => u.id === user)
    }
  }



  if (props.user === null) {
    return (
      <Container>
        <div>
          <h2>Log in to application</h2>
          <Notif />
          {loginForm()}
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div>
        <h2>blogs</h2>
        <Notif />
        <Logout   />
        <Switch>
          <Route path="/users/:id">
            <User user={user()}/>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Blog />
            {blogForm()}
          </Route>
        </Switch>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }

}
const mapDispatchToProps = {
  initialLogin,
  initialBlogs,
  login,
  setNotification,
  addBlog,
  getUsers,
  setUserToShow
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
