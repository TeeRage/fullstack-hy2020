/**
 * Sovelluksen antamien tiedotteiden näyttäminen käyttäjälle.
  * Tyhjennetåään ilmoitus, kun null, muutoin annetaan typen mukaan joko success tai error -ilmoitus
*/  
import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification