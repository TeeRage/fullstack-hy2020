/**
* Sovelluksen antamien tiedotteiden näyttäminen käyttäjälle.
* Renderöi redux-storeen talletetun viestin.
*/
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  
  const notification = useSelector(state => state.notifications)

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