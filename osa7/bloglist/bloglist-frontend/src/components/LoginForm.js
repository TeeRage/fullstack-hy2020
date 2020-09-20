import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

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
      <h2>login to application</h2>
      <form onSubmit={loginClick}>
        <div>
            username
          <input
            name='username'
          />
        </div>
        <div>
            password
          <input
            name='password'
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { loginUser },
)(LoginForm)