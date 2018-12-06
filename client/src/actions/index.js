import {
  GET_FOOD,
  LOGIN,
  LOGOUT,
  GET_ME_USER,
  UPDATE_ME_USER,
  POST_FOOD,
  POST_ACTIVITY,
  UPDATE_FOOD,
  DELETE_FOOD
} from './actionTypes'
import ReduxHelpers from '../utils/ReduxHelpers'

export const postActivity = () => ReduxHelpers.createAction(POST_ACTIVITY, 'post', '/api/activity')
export const getFood = () => ReduxHelpers.createAction(GET_FOOD, 'get', '/api/food')
export const postFood = (data) => ReduxHelpers.createAction(POST_FOOD, 'post', '/api/food', data)
export const updateFood = (data, id) => ReduxHelpers.createAction(UPDATE_FOOD, 'put', `/api/food/${id}`, data)
export const deleteFood = (id) => ReduxHelpers.createAction(DELETE_FOOD, 'delete', `/api/food/${id}`)
export const login = (data) => ReduxHelpers.createAction(LOGIN, 'post', '/api/auth/login', data)
export const logout = () => ReduxHelpers.createAction(LOGOUT, 'get', '/api/auth/logout')
export const getMeUser = () => ReduxHelpers.createAction(GET_ME_USER, 'get', '/api/user/me')
export const updateMeUser = (data) => ReduxHelpers.createAction(UPDATE_ME_USER, 'put', '/api/user/me', data)
