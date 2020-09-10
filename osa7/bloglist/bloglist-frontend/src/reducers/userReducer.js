import loginService from '../services/login'

const userReducer = (state = null, action) => {

  switch (action.type) {

  case 'SAVE_USER':
    return action.data

  case 'LOGOUT_USER':
    return null

  case 'LOAD_USER':
    return state

  default:
    return state
  }
}

//Sisäänkirjautuminen
export const loginUser = (user) => {
  return async dispatch => {
    const data = await loginService.login(user)
    dispatch({
      type: 'SAVE_USER',
      data
    })
  }
}

export const logoutUser = () => (
  { type: 'LOGOUT_USER' }
)

export const loadUser = () => (
  { type: 'LOAD_USER' }
)

export default userReducer