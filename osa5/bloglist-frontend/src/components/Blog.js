/**
 * Kirjautuneelle käyttäjälle näytettävä blogiolio.
 */
import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {

  //Blogilistan ulkoasu
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //Blogin kaikkien tietojen näyttämiseen liittyvät asiat (toiminnallisuus napille, joka tuo esiin/piilottaa tietoja)
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {

    setVisible(!visible)

    if(buttonText === 'view'){
      setButtonText('hide')
    }
    else{
      setButtonText('view')    
    }    
  }

  //Yhden tykkäyksen lisääminen blogille 
  const addLike = (event) => {

    event.preventDefault()
    const id = blog.id

    likeBlog(id, {      
        user: blog.user,
        likes: blog.likes+1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
    )
  }

  //Käyttäjälle "näkyvä" osa
  return(
    <div style = {blogStyle}>
      {blog.title}, {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      <div style = {showWhenVisible}>
        <ul>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={addLike}>like</button></li>
          <li>User added: {blog.user.username}</li>
        </ul> 
      </div>
    </div>
  )
}

export default Blog
