/* eslint-disable no-case-declarations */
import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default reducer