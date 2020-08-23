/**
 * Sovelluksen antamien tiedotteiden näyttäminen käyttäjälle.
  * Tyhjennetåään ilmoitus, kun null, muutoin annetaan typen mukaan joko success tai error -ilmoitus
*/
import React from 'react'

const Notification = ({ notification }) => {

  if (notification === null) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div className={notification.type} id='notificationDiv' style={style}>
      {notification.message}
    </div>
  )
}

export default Notification