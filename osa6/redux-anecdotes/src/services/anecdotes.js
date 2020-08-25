/**
 * Axiosia hyödyntävä, backendistä dataa hakeva metodi.
 */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

//Hae kaikki anekdootit
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

//Luo usi anekdootti, likes 0 pohjalta
const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew }