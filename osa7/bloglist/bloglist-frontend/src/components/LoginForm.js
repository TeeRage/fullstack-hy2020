
import React, { useState } from 'react'

const LoginForm = (props) => {

  const [username, setUsername] = useState(props.username)
  const [password, setPassword] = useState(props.password)

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
            username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

export default LoginForm