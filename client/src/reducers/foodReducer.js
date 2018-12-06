import { GET_FOOD, POST_FOOD, UPDATE_FOOD, DELETE_FOOD } from '../actions/actionTypes'
import ReduxHelpers from '../utils/ReduxHelpers'

const getFoodTypes = ReduxHelpers.createRequestTypes(GET_FOOD)
const postFoodTypes = ReduxHelpers.createRequestTypes(POST_FOOD)
const updateFoodTypes = ReduxHelpers.createRequestTypes(UPDATE_FOOD)
const deleteFoodTypes = ReduxHelpers.createRequestTypes(DELETE_FOOD)

const initialState = {
  isFetching: false,
  data: null,
  error: null
}

export function foodReducer(state = initialState, action) {
  const updateFoodState = (stateData, data) => {
    const selectedData = stateData.find((x) => x.id === data.id)
    const selectedDataIndex = stateData.findIndex((x) => x.id === data.id)

    return [...stateData.slice(0, selectedDataIndex), data, ...stateData.slice(selectedDataIndex + 1, stateData.length)]
  }

  const deleteFoodState = (stateData, data) => {
    const selectedDataIndex = stateData.findIndex((x) => x.id === data.id)

    return [...stateData.slice(0, selectedDataIndex), ...stateData.slice(selectedDataIndex + 1, stateData.length)]
  }

  switch (action.type) {
    case getFoodTypes.REQUEST:
    case postFoodTypes.REQUEST:
    case updateFoodTypes.REQUEST:
    case deleteFoodTypes.REQUEST:
      return { ...state, isFetching: true, error: null }

    case getFoodTypes.FAILURE:
    case postFoodTypes.FAILURE:
    case updateFoodTypes.FAILURE:
    case deleteFoodTypes.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      }

    case getFoodTypes.SUCCESS:
    case updateFoodTypes.SUCCESS:
    case postFoodTypes.SUCCESS:
    case deleteFoodTypes.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        error: null
      }

    default:
      return state
  }
}
