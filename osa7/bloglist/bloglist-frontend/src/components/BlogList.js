import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import NewBlog from './NewBlog'

const BlogList = () => {

  //Näytettävät blogit
  const blogs = useSelector(state => {
    return state.blogs
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }

  //Togglablelle ref tiedot
  const blogFormRef = React.createRef()

  return (
    <div>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle} className='blog'>
          <div>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList