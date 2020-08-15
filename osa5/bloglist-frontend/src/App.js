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

  //Haetaan blogit tietokannasta
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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
  const createNewBlog = (blogObject) => {

    //Lomakkeen näkyvyyden säätely ref avulla
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })    

    notifyWith(`A new blog '${blogObject.title}' by '${blogObject.author}' added`)
  }

  //Like-nappulan painallus (blogille +1 like)
  const likeBlog = async (id, blogObject) => {

    await blogService.update(id, blogObject)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)

    console.log(`Blog '${blogObject.title}' has been liked.`)
    notifyWith(`Blog '${blogObject.title}' has been liked.`)
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
          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={createNewBlog}
            />
          </Togglable>
          <br/>   
      <h2>Blogs</h2>      
        <ul>
          {blogs.map((blog, i) => 
           <Blog
             key={i}
             blog={blog}
             likeBlog={likeBlog}
           />
          )}
        </ul>
      </div>
    )
  }//newBlogForm 

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
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )//LoginForm

  //Sivun 'yleinen' ulkoasu: näytettävä sisältö sen mukaan, onko käyttäjä kirjautunut sisään vai ei
  return (
    <div>
      <h1>Blogs</h1>      
      <Notification notification={notification} />
      {user === null ?
        loginForm() :        
        <div>          
          <p>{user.name} logged in</p>
          <button onClick={()=>logout()}>Logout</button>
          <br/><br/>
          {blogForm()}                   
        </div>
      }
    </div>
  )
}//const App

export default App