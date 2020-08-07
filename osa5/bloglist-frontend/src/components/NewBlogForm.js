/**
 * Lomake uuden blogin lisäämistä varten.
*/
import React from 'react'

const NewBlogForm = ({
   handleSubmit,
   handleTitleChange,
   handleAuthorChange,
   handleUrlChange,
   newBlogTitle,
   newAuthorName,
   newBlogUrl
  }) => {
  return (
    <div>
        <h2>Create new blog</h2>
        
        <form onSubmit={handleSubmit}>
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

export default NewBlogForm