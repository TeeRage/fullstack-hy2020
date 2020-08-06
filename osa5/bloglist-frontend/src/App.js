import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification ] = useState(null)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newaAuthorName, setNewAuthorName] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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
  const createNewBlog = async (event) => {

    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newaAuthorName,
      url: newBlogUrl
    }
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewAuthorName('')
        setNewBlogUrl('')
      })
    
    notifyWith(`A new blog '${blogObject.title}' by '${blogObject.author}' added`)
  }
  
  //Uloskirjautumisen toiminto
  function logout() {
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(user.token)
    setUser(null)
    blogService.setToken(null)
  }

  //Sivun ulkoasu, kun käyttäjä on kirjautunut onnistuneesti sisään
  const blogForm = () => (  
    <div><br/><br/><br/>
    <h2>Create new blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title
            <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={newaAuthorName}
            name="Author"
            onChange={({ target }) => setNewAuthorName(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div><br/>
        <button type="submit">create</button>
      </form><br/><br/>

      <h2>Blogs</h2>
      <ul>
       {blogs.map((blog, i) => 
         <Blog
           key={i}
           blog={blog}
         />
       )}
      </ul>
    </div>
  )

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
  )

  //Sivun 'yleinen' ulkoasu: näytettävä sisältö sen mukaan, onko käyttäjä kirjautunut sisään vai ei
  return (
    <div>
      <h1>Blogs</h1>      
      <Notification notification={notification} />
      {user === null ?
        loginForm() :        
        <div>          
          <p>{user.name} logged in</p>
          <button onClick={()=>logout()}>Logout</button><br/>
          {blogForm()}          
        </div>
      }
    </div>
  )
}

export default App