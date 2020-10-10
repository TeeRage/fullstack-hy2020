/**
 * Lomake käyttäjän sisäänkirjautumiselle.
 */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

import {
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = (props) => {

  const history = useHistory()
  const dispatch = useDispatch()

  //Sisäänkirjautuminen
  const loginClick = async (event) => {
    event.preventDefault()

    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    event.target.username.value = ''
    event.target.password.value = ''

    if(user.username && user.password){
      try{

        //Tehdään käyttäjäntunnistus
        await props.loginUser(user)

        //Jos tunnistus onnistui, local storagessa on käyttäjä
        let userObject = JSON.parse(localStorage.getItem('loggedBlogAppUser'))

        if(!userObject){
          dispatch(setNotification('Käyttäjätunnukset ovat virheelliset', 'error', 5))
        }
        else{
          await props.onLogin(userObject) //tallennetaan käyttäjänimi useStateen
          history.push('/') //Siirrytään osoitteen / komponenttiin
        }
      }
      catch(error){
        dispatch(setNotification(`'${error}'`, 'error', 5))
      }
    }
    else{
      dispatch(setNotification('virhe, käyttäjätunnus tai salasana puuttuu', 'error', 5))
    }
  }

  return (
    <div>
      <h2>Sisäänkirjautuminen</h2>
      <form onSubmit={loginClick}>
        <div>
          <TextField
            name='username'
            label="Käyttäjänimi"
            defaultValue=''
          />
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