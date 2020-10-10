/**
 * Reducer Uuden ilmoituksen näyttämiselle, kestää sekunneissa (time) annetun ajan.
 * Ilmoituksen ulkoasu määräytyy annetun tyypin (error, succes jne.) mukaan.
 */
const notificationReducer = (state = null, action) => {

  switch (action.type) {

  case 'SET_NOTIFICATION':
    return {
      notifMessage: action.notifMessage,
      notifType: action.notifType
    }

  case 'CLEAR_NOTIFICATION':
    return null

  default:
    return state
  }
}

let timeoutId

export const setNotification = (notifMessage, notifType, time) => {

  return async (dispatch) => {

    dispatch({
      type: 'SET_NOTIFICATION',
      notifMessage,
      notifType
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export const clearNotification = () => (
  { type: 'CLEAR_NOTIFICATION' }
)

export default notificationReducer