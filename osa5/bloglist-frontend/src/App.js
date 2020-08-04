import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  //Haetaan blogit tietokannasta
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //Tarkistetaan, onko sivulle jo kirjauduttu
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Kirjautumispainikkeen toiminto
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
      console.log('wrong credentials')
    }
  }
  
  //Sivun ulkoasu, kun käyttäjä on kirjautunut onnistuneesti sisään
  const blogForm = () => (  
    <div>
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

  //Uloskirjautumisen toiminto
  function logout() {
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(user.token)
    setUser(null)
    blogService.setToken(null)
  }

  //Sivun ulkoasu, näytettävä sisältö sen mukaan, onko käyttäjä kirjautunut vai ei
  return (
    <div>
      <h1>Blogs</h1>
      {user === null ?
        loginForm() :        
        <div>          
          <p>{user.name} logged in</p>
          <button onClick={()=>logout()}>Logout</button>
          {blogForm()}          
        </div>
      }
    </div>
  )
}

export default App