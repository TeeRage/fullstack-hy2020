//Uuden ilmoituksen näyttäminen, kestää sekunneissa (time) annetun ajan
export const notify = (message, time) => {

  return async (dispatch) => {

    dispatch(showNotification(message))

    setTimeout(() => {
      dispatch(hideNotification())
    }, time*1000)

  } 
}

function showNotification(message) {
  return { type: 'NOTIFY', data: { message } }
}

function hideNotification() {
  return { type: 'CLEAR',  data: null }
}

const notificationReducer = (state = null, action) => {
  
  switch (action.type) {

    case 'NOTIFY':
      return action.data.message

    case 'CLEAR':
      return action.data

    default:
      return state
  }
}

export default notificationReducer