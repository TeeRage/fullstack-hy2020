/**
 * Lomake uuden blogin lisäämistä varten.
 * Saa syötteenä metodin, jolla blogi lisätään MongoDB tietokantaan.
*/
import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newAuthorName, setNewAuthorName] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthorName(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {    
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newAuthorName,
      url: newBlogUrl
    }) 
    
    setNewBlogTitle('')
    setNewAuthorName('')
    setNewBlogUrl('')
  }

  return (
    <div>
        <h2>Create new blog</h2>        
        <form onSubmit={addBlog}>
          <div>
            title
              <input
              type="text"
              value={newBlogTitle}
              onChange={handleTitleChange}
              name="Title"
            />
          </div>
          <div>
            author
              <input
              type="text"
              value={newAuthorName}
              onChange={handleAuthorChange}
              name="Author"
            />
          </div>
          <div>
            url
              <input
              type="text"
              onChange={handleUrlChange}
              value={newBlogUrl}
              name="Url"
            />
          </div><br/>
          <button type="submit">create</button>
        </form><br/>
    </div>
  )
}

export default BlogForm