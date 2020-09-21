import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Switch,
  Route,
  Redirect,
  Link,
  useHistory
} from 'react-router-dom'
import {
  Container,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core'

import { initializeBlogs } from './reducers/blogReducer'
import { loadUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'

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
    <Container>
      <div>
        {user
          ?
          <em>
            <AppBar position="fixed">
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  Blogit
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  Käyttäjät
                </Button>
                <em style={{ flex: 1 }}>
                  {user} kirjautunut
                </em>
                <Button color="inherit" onClick={handleLogout}>
                  Kirjaudu ulos
                </Button>
              </Toolbar>
            </AppBar>
          </em>
          : null
        }
        <h1>Blogilistasovellus</h1>
        <Notification/>
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/users/:id">
            <User />
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
    </Container>
  )
}

export default App