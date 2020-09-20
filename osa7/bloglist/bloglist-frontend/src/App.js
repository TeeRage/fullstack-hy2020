import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory
} from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { loadUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'

const App = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  let userObject = JSON.parse(localStorage.getItem('loggedBlogAppUser'))
  const [user, setUser] = useState(userObject)

  const login = (user) => {
    setUser(user)
  }

  //Haetaan blogit ja kirjautunut käyttäjä Redux storesta
  useEffect( () => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(loadUser())
  }, [dispatch])

  //Käyttäjän uloskirjautuminen
  const handleLogout = () => {
    dispatch(logoutUser())
    setUser(null)
    history.push('/')
  }

  return (
    <div>
      <div>
        {user
          ?
          <em>
            <Link to="/">Blogs</Link>
            <Link to="/users">Users</Link>
            {user} logged in <button onClick={handleLogout}>logout</button></em>
          : null
        }
      </div>
      <h1>Blogilistasovellus</h1>
      <Notification/>
      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/login">
          <LoginForm onLogin={login} />
        </Route>
        <Route exact path="/">
          {user
            ? <BlogList /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  )
}

export default App