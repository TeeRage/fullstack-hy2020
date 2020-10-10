/**
 * Reducer blogitoiminnoille:
 * Blogien hakeminen tietopkannasta, uuden blogin luominen, blogista tykkääminen ja blogin poistaminen.
 */
import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
  //console.log('action', action)
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data.sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
  case 'LIKE':
    return state.map(b => b.id===action.data.id ? action.data : b).sort(byLikes)
  case 'REMOVE':
    return [...state, action.data]
  default:
    return state
  }
}

//Blogien hakeminen tietokannasta
export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

//Uuden blogin luominen
export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

//Blogista tykkääminen
//Tämä vaatii hieman korjailua vielä!
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

//Blogin poistaminen
//Tämä vaatii hieman korjailua vielä!
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