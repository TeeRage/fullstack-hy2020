import React from 'react'
import { connect } from 'react-redux'
import { loginUser, loadUser } from '../reducers/userReducer'

const LoginForm = (props) => {

  //Sisäänkirjautuminen
  const login = async (event) => {

    event.preventDefault()

    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    event.target.username.value = ''
    event.target.password.value = ''

    await props.loginUser(user)
  }

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={login}>
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
  { loginUser, loadUser },
)(LoginForm)