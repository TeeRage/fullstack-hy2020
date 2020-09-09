import React, { useState, useEffect } from 'react'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import loginService from './services/login'
import storage from './utils/storage'

import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()

  //Haetaan blogit
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //Käyttäjänhallintaan liittyvät jutut
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      setUser(user)
      //notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      //notifyWith('wrong username/password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList user={user}/>
    </div>
  )
}

export default App