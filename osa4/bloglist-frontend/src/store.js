import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer
})


export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))
