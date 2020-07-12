
import React from 'react'

//Komponentti virheilmoituksia varten
const Notification = ({ message, notifType}) => {
  
    //Ilmoituksen tyhjentäminen ajastimella
    if (message === null) {
      return null
    }
    //Ilmoitus onnistuneesta muutoksesta
    else if (notifType === 'success'){
      return (
        <div className="success">
          {message}
        </div>
      )
    }
    //Virheilmoitus
    else if (notifType === 'error'){
      return (
        <div className="error">
          {message}
        </div>
      )
    }
    else{
      return null
    }    
}

export default Notification