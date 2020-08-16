/**
 * Kirjautuneelle käyttäjälle näytettävä blogiolio.
 */
import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {

  const [username] = useState(user.username)

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

  //Painike, jolla näytetään/piilotetaan blogin lisätiedot
  const toggleVisibility = () => {
    setVisible(!visible)
    if(buttonText === 'view'){
      setButtonText('hide')
    }
    else{
      setButtonText('view')    
    }    
  }

  //Blogin poistaminen napin painalluksesta
  const removeButtonClick = (event) => {    
    event.preventDefault()
    const id = blog.id
    if (window.confirm("Are you sure that you want to delete this blog?")) { 
      removeBlog(id) 
    }
  }

  //Yhden tykkäyksen lisääminen blogille (like button)
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

  //Käyttäjälle "näkyvä" osa (poisto-nappi näkyy vain blogeissa, jotka käyttäjä on itse lisännyt)
  return(
    <div style = {blogStyle}>
      {blog.title}, {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      <div style = {showWhenVisible}>
        <ul>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={addLike}>like</button></li>
          <li>User added: {blog.user.username}</li>
          {blog.user.username === username ?<button onClick={removeButtonClick}>Remove</button> : ''}
        </ul> 
      </div>
    </div>
  )
}

export default Blog
