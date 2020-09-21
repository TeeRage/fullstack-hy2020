/**
 * Yksittäisen blogin tietojen näyttäminen.
 */
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams,useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blogs, userInfo }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const blogFound =  blogs.find(a => a.id === id)

  //Blogista tykkääminen (+1 likes), KESKEN
  const like = () => {
    dispatch(likeBlog(blogFound))
    dispatch(setNotification(`Tykkäsit blogista '${blogFound.title}'`, 5))
  }

  //Blogin poistaminen, KESKEN
  const remove = async () => {
    if (window.confirm('Are you sure that you want to delete this blog?')) {
      dispatch(removeBlog(blogFound.id))
      dispatch(setNotification(`Blogi '${blogFound.title}' on poistettu`, 5))
      history.push('/')
    }
  }

  if (!blogFound) {
    return null
  }

  return (
    <div>
      <h2>{blogFound.title}, kirjoittanut <i>{blogFound.author}</i> </h2>
      <p>{blogFound.likes} tykkäystä
        <Button
          variant='outlined'
          color='secondary'
          size='small'
          onClick={() => like()}
        >
          Tykkää
        </Button></p>
      <p>{blogFound.url}</p>
      <p>Lisännyt {blogFound.user.name}</p>
      {userInfo.user.username===blogFound.user.username&&
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => remove()}
          >
            Poista
          </Button>}
    </div>
  )
}


export default connect (
  (state) => ({ userInfo: state.user, blogs: state.blogs })
) (Blog)