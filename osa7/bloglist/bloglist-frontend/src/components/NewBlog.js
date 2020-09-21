import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import {
  TextField,
  Button
} from '@material-ui/core'

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
      <h2>Lisää uusi blogi</h2>
      <form onSubmit={addNewBlog}>
        <div>
          <TextField label='Kirjoittaja' name='author' />
        </div>
        <div>
          <TextField label='Otsikko' name='title' />
        </div>
        <div>
          <TextField label='www-sivu' name='url' />
        </div>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          type='submit'
          id="create"
        >
          Tallenna
        </Button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createBlog, setNotification },
)(NewBlog)