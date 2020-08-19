import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification ] = useState(null)

  const blogFormRef = useRef()

  //Järjestä arrayn blogit likejen mukaan suurimmasta pienimpään
  function orderBlogs(blogArray) {
    const ordererdBlogs = blogArray.sort(function(a,b){
      return b.likes - a.likes
    })
    return ordererdBlogs
  }

  //Haetaan blogit tietokannasta ja järjestetään ne likejen määrän perusteella
  useEffect(() => {
    async function fetchData(){
      const blogArray = await blogService.getAll()
      setBlogs(orderBlogs(blogArray))
    }
    fetchData()
  }, [])

  //Tarkistetaan, onko sivulle jo kirjautunut joku käyttäjä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Metodi ilmoituksille, kestää 3 sekuntia
  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  //Sisäänkirjautumispainikkeen toiminto
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      //Tallennetaan käyttäjän tiedot selaimen local storageen
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      //console.log( window.localStorage.getItem('loggedNoteappUser'))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong username or password', 'error')
      console.log('wrong credentials')
    }
  }

  //Uuden blogin lisäämisen toiminto
  const createNewBlog = async (blogObject) => {

    //Lomakkeen näkyvyyden säätely ref avulla
    await blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    console.log(`A new blog '${blogObject.title}' by '${blogObject.author}' added`)
    notifyWith(`A new blog '${blogObject.title}' by '${blogObject.author}' added`)
  }

  //Like-nappulan painallus (blogille +1 like ja päivitetään suuruusjärjestyksen mukaan)
  const likeBlog = async (id, blogObject) => {

    await blogService.update(id, blogObject)
    const updatedBlogs = await blogService.getAll()
    setBlogs(orderBlogs(updatedBlogs))

    console.log(`Blog '${blogObject.title}' has been liked.`)
    notifyWith(`Blog '${blogObject.title}' has been liked.`)
  }

  //Remove-nappulan painallus (poistetaan blogi tietokannasta)
  const removeBlog = async (id) => {

    await blogService.removeBlog(id)
    const updatedBlogs = await blogService.getAll()
    setBlogs(orderBlogs(updatedBlogs))

    console.log('Blog has been removed.')
    notifyWith('Blog has been removed.')
  }

  //Uloskirjautumisen toiminto
  function logout() {
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(user.token)
    setUser(null)
    blogService.setToken(null)
  }

  //Sivun ulkoasu, kun käyttäjä on kirjautunut sisään onnistuneesti
  const blogForm = () => {
    return (
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => logout()}>Logout</button>
        <br/><br/>
        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
          <BlogForm createBlog={createNewBlog}/>
        </Togglable>
        <br/>
        <h2>Blogs</h2>
        <ul>
          {blogs.map((blog, i) =>
            <Blog
              key={i}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user}
            />
          )}
        </ul>
      </div>
    )
  }//blogForm

  //Sivun ulkoasu, jos käyttäjä ei ole vielä kirjautunut onnistuneesti
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="on"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )//loginForm

  //Sivun 'yleinen' ulkoasu: näytettävä sisältö sen mukaan, onko käyttäjä kirjautunut sisään vai ei
  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {user === null?loginForm():blogForm()}
    </div>
  )
}//const App

export default App