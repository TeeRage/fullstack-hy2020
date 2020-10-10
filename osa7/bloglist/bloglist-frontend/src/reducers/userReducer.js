/**
 * Reducer yksittäisen sisäänkirjautuneen käyttäjän tietojen tallentamiseen.
 */
import loginService from '../services/login'

const storageKey = 'loggedBlogAppUser'
let user = JSON.parse(localStorage.getItem(storageKey))

const initialState = user ? { loggedIn: true, user } : {}

const userReducer = (state = initialState, action) => {

  switch (action.type) {

  case 'SAVE_USER':
    localStorage.setItem(storageKey, JSON.stringify(action.data.username))
    console.log('Onnistunut sisäänkirjautuminen: ', JSON.parse(localStorage.getItem(storageKey)))
    return {
      loggedIn: true,
      user: action.data
    }

  case 'LOGOUT_USER':
    localStorage.removeItem(storageKey)
    return {
      loggedIn: false,
      user: {}
    }

  case 'LOAD_USER':
    return state

  default:
    return state
  }
}

//Sisäänkirjautuminen
export const loginUser = (user) => {

  return async dispatch => {
    try{
      const data = await loginService.login(user)
      if(data.statusCode === 401){
        throw Error('rejected')
      }
      else{
        dispatch({
          type: 'SAVE_USER',
          data
        })
      }
    }
    catch(exception){
      console.log(exception)
    }
  }
}

export const logoutUser = () => (
  { type: 'LOGOUT_USER' }
)

export const loadUser = () => (
  { type: 'LOAD_USER' }
)

export default userReducer