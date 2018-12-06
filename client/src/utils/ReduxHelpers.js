import axios from 'axios'

function createRequestTypes(base) {
  const REQUEST = 'REQUEST'
  const SUCCESS = 'SUCCESS'
  const FAILURE = 'FAILURE'

  return [REQUEST, SUCCESS, FAILURE].reduce((x, type) => {
    x[type] = `${base}_${type}`
    return x
  }, {})
}

const createAction = (type, method, url, data) => {
  const requestTypes = createRequestTypes(type)
  return async(dispatch) => {
    dispatch({ type: requestTypes.REQUEST })

    try {
      const response = await axios[method](url, data)
      dispatch({ type: requestTypes.SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: requestTypes.FAILURE, payload: error })
    }
  }
}

const createReducer = (actionType) => {
  const requestTypes = createRequestTypes(actionType)

  const initialState = {
    isFetching: null,
    data: null,
    error: null
  }
  return (state = initialState, action) => {
    switch (action.type) {
      case requestTypes.REQUEST:
        return { ...state, isFetching: true, error: null }
      case requestTypes.SUCCESS:
        return { ...state, isFetching: false, data: action.payload.data, error: null }
      case requestTypes.FAILURE:
        return { ...state, isFetching: false, data: null, error: action.payload.message }
      default:
        return state
    }
  }
}

export default {
  createReducer,
  createAction,
  createRequestTypes
}
