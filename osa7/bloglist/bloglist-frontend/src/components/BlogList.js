import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
//import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = ({ user }) => {

  const [visible, setVisible] = useState(false)
  const label = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => {
    return state.blogs
  })

  const dispatch = useDispatch()

  //Blogista tykkääminen (+1 likes), KESKEN
  const like = (id) => {
    const toLike = blogs.find(b => b.id === id)
    //dispatch(likeBlog(toLike))
    dispatch(setNotification(`Tykkäsit blogista '${toLike.title}'`, 5))
  }

  //Blogin poistaminen, KESKEN
  const remove = async (id) => {
    if (window.confirm('Are you sure that you want to delete this blog?')) {
      const toRemove = blogs.find(b => b.id === id)
      //dispatch(removeBlog(id))
      dispatch(setNotification(`Blogi '${toRemove.title}' on poistettu`, 5))
    }
  }

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{label}</button>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle} className='blog'>
          <div>
            <i>{blog.title}</i> by {blog.author}
          </div>
          {visible&&(
            <div>
              <div>{blog.url}</div>
              <div>likes {blog.likes}
                <button onClick={() => like(blog.id)}>like</button>
              </div>
              <div>{blog.user.name}</div>
              {user.username===blog.user.username&&
              <button onClick={() => remove(blog.id)}>remove</button>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default connect (
  (state) => ({ user: state.user })
) (BlogList)