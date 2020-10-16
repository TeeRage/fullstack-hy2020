import axios from 'axios'

//const baseUrl = 'http://localhost:3001/api/blogs'
const baseUrl = '/api/blogs'

//Haetaan token local storagesta ja luodaan authorization header
const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUserToken'))}` }
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const request = await axios.post(baseUrl, blog, getConfig())
  return request.data
}

const update = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return request.data
}

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.data
}

export default { getAll, create, update, remove }