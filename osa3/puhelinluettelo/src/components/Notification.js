import React from 'react'

//Komponentti virheilmoituksia varten
//Tyhjennetåään ilmoitus, kun null, muutoin annetaan joko success tai error -ilmoitus
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