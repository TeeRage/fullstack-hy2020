/**
* Sovelluksen antamien tiedotteiden näyttäminen käyttäjälle.
* Renderöi redux-storeen talletetun viestin.
*/
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div id='notificationDiv' style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {

  if(state.notifications === null){
    return null
  }
  return {
    notification: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification