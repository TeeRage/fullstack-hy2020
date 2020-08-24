export const notify = (message) => {
  return {
    type: 'NOTIFY',
    data: { message }
  }
}

const notificationReducer = (state = 'Testiviesti', action) => {

  console.log('action', action)

  switch (action.type) {

    case 'NOTIFY':
      return action.data.message

    default:
      return state
  }
}

export default notificationReducer