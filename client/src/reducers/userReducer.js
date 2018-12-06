import { LOGIN, LOGOUT, GET_ME_USER, UPDATE_ME_USER } from '../actions/actionTypes'
import ReduxHelpers from '../utils/ReduxHelpers'
import { toast } from 'react-toastify'

const loginTypes = ReduxHelpers.createRequestTypes(LOGIN)
const logoutTypes = ReduxHelpers.createRequestTypes(LOGOUT)
const getMeUserTypes = ReduxHelpers.createRequestTypes(GET_ME_USER)
const updateMeUserTypes = ReduxHelpers.createRequestTypes(UPDATE_ME_USER)

const initialState = {
  isFetching: true,
  data: null,
  error: null
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case loginTypes.REQUEST:
    case logoutTypes.REQUEST:
    case getMeUserTypes.REQUEST:
    case updateMeUserTypes.REQUEST:
      return { ...state, isFetching: true, error: null }

    case getMeUserTypes.FAILURE:
      return { ...state, isFetching: false, error: action.payload.response.data.message }

    case loginTypes.FAILURE:
    case logoutTypes.FAILURE:
    case updateMeUserTypes.FAILURE:
      const error = action.payload.response.data.message
      return { ...state, isFetching: false, error }

    case getMeUserTypes.SUCCESS:
      return { ...state, isFetching: false, data: action.payload.data, error: null }

    case updateMeUserTypes.SUCCESS:
      toast.success('Profile updated successfully')
      return { ...state, isFetching: false, data: action.payload.data, error: null }

    case loginTypes.SUCCESS:
      window.location.href = '/'
      return { ...state, isFetching: false, data: action.payload.data, error: null }

    case logoutTypes.SUCCESS:
      window.location.href = '/'
      return { ...state, isFetching: false, data: null, error: null }

    default:
      return state
  }
}
