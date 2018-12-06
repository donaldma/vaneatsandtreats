import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { foodReducer } from './foodReducer'

export default combineReducers({
  foodReducer,
  userReducer
})