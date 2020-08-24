//Uuden ilmoituksen näyttäminen
export const notify = (message) => {
  return {
    type: 'NOTIFY',
    data: { message }
  }
}

//Ilmoituksen "poistaminen" näkyvistä
export const removeNotification = () => {
  return {
    type: 'CLEAR',
    data: null
  }
}

const notificationReducer = (state = null, action) => {

  console.log('action', action)

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