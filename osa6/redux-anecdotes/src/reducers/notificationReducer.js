//Uuden ilmoituksen näyttäminen, kestää sekunneissa (time) annetun ajan
export const notify = (message, time) => {

  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: null
      })
    }, time*1000)
  }
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