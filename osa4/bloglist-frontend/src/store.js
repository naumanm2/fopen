import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import visibilityReducer from './reducers/visibilityReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'



const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer,
  showuser: userReducer,
  visibility: visibilityReducer,
  users: usersReducer
})


export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))
