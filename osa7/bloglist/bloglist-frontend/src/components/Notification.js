/**
* Sovelluksen antamien tiedotteiden näyttäminen käyttäjälle.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = ({ notification }) => {

  if (!notification) {
    return null
  }

  return (
    <div>
      {(notification &&
        <Alert severity="success">
          {notification}
        </Alert>
      )}
    </div>
  )
}

export default connect(
  (state) => ({ notification: state.notification })
)(Notification)