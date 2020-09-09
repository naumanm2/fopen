import loginService from '../services/login'
import blogService from '../services/blogs'

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user
      })
    }
   catch(exception) {
     dispatch({
       type: 'FAILED_LOGIN'
     })
   }
  }
}

export const initialLogin = () => {
  return async dispatch => {
    const data = window.localStorage.getItem('loggedBlogappUser')
    if (data) {
      const user = JSON.parse(data)
      blogService.setToken(user.token)
      dispatch({
        type: 'INITIAL_LOGIN',
        data: user
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}


const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'INITIAL_LOGIN':
      return action.data
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      window.localStorage.clear()
      return null
    case 'FAILED_LOGIN':
      return state
    default:
      return state
  }
}

export default loginReducer
