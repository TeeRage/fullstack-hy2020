import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  if (response.statusCode === 401) {
    throw Error('rejected')
  }
  return response.data
}

export default { login }