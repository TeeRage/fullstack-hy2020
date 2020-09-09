import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = (props) => {

  //Uuden blogin lisääminen
  const addNewBlog = async (event) => {

    event.preventDefault()

    const content = {
      author: event.target.author.value,
      title: event.target.title.value,
      url: event.target.url.value
    }
    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''

    props.setNotification(`Lisäsit blogin '${content.title}'`, 5)
    props.createBlog(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          author
          <input name='author'/>
        </div>
        <div>
          title
          <input
            name='title'
          />
        </div>
        <div>
          url
          <input
            name='url'
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createBlog, setNotification },
)(NewBlog)