/**
* Sovelluksen antamien tiedotteiden näyttäminen käyttäjälle.
* Renderöi redux-storeen talletetun viestin.
*/
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const Notification = () => {

  const dispatch = useDispatch()  
  const notification = useSelector(state => state.notifications)
  const notifyWithMessage = (message) => {dispatch(notify(message))}
  //{notifyWithMessage('TESTIVIESTI')}

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div id='notificationDiv' style={style}>
      {notification}      
    </div>
  )
}

export default Notification