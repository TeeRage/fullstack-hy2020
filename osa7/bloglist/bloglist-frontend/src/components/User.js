/**
 * Yksittäisen käyttäjän tietojen näyttäminen.
 */
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = ({ users, blogs }) => {

  const id = useParams().id
  const user =  users.find(u => u.id === id)
  const blogsByUser = blogs.filter(blog => blog.user.username === user.username)

  return (
    <div>
      <h1>{user.name}</h1>
      <h4>Käyttäjän {user.name} lisäämät blogit:</h4>
      {blogsByUser.map(blog =>
        <div key={blog.id}>
          <li>
            {blog.title}
          </li>
        </div>
      )}
    </div>
  )
}


export default connect (
  (state) => ({ users: state.users, blogs: state.blogs })
) (User)