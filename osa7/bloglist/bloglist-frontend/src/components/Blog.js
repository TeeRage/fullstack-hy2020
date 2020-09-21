/**
 * Yksittäisen blogin tietojen näyttäminen.
 */
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams,useHistory } from 'react-router-dom'

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

  return (
    <div>
      <h2>{blogFound.title} by <i>{blogFound.author}</i> </h2>
      <p>{blogFound.likes} likes <button onClick={() => like()}>like</button></p>
      <p>{blogFound.url}</p>
      <p>Added by {blogFound.user.name}</p>
      {userInfo.user.username===blogFound.user.username&&
          <button onClick={() => remove()}>remove</button>}
    </div>
  )
}


export default connect (
  (state) => ({ userInfo: state.user, blogs: state.blogs })
) (Blog)