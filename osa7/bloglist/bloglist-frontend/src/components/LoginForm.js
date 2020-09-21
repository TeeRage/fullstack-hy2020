import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

import {
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = (props) => {

  const history = useHistory()

  //Sisäänkirjautuminen
  const loginClick = (event) => {

    event.preventDefault()

    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    event.target.username.value = ''
    event.target.password.value = ''

    props.loginUser(user)
    props.onLogin(user.username)
    history.push('/') //Siirrytään osoitteen / komponenttiin
  }

  return (
    <div>
      <h2>Sisäänkirjautuminen</h2>
      <form onSubmit={loginClick}>
        <div>
          <TextField label='Käyttäjänimi' name='username' />
        </div>
        <div>
          <TextField label='Salasana' type='password' name='password'/>
        </div>
        <Button variant='contained' color='primary' type='submit'>
          Kirjaudu
        </Button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { loginUser },
)(LoginForm)