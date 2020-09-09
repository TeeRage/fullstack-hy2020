/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
  //console.log('action', action)
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
  case 'LIKE':
    const liked = action.data
    return state.map(b => b.id===liked.id ? liked : b).sort(byLikes)
  case 'REMOVE':
    return [...state, action.data]
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const blogToLike = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(blogToLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

//Tämä saattaa vaatia hieman korjailua vielä!
export const removeBlog = (id) => {
  return async dispatch => {
    const data = await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data
    })
  }
}

export default reducer