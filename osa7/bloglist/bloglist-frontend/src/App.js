import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'

import { initializeBlogs } from './reducers/blogReducer'
import { loadUser, logoutUser } from './reducers/userReducer'

const App = ({ user }) => {

  const dispatch = useDispatch()

  //Togglablelle ref tiedot
  const blogFormRef = React.createRef()

  //Haetaan blogit Redux storesta
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //Ladataan Redux storesta kirjautuneen käyttäjän tiedot
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  //Käyttäjän uloskirjautuminen
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  //Näytetään kirjautumislomake, jos ei ole kirjautunutta käyttäjää
  if ( !user ) {
    return (
      <LoginForm/>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList/>
    </div>
  )
}

export default connect (
  (state) => ({ user: state.user })
) (App)