import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

//Kirjautuneen käyttäjän token
const setToken = newToken => {
  token = `bearer ${newToken}`
}

//Hae kaikki blogit tietokannasta
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

//Blogin lisääminen tietokantaan
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

//Päivitä blogin tietoja
const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
}

//Poista blogi tietokannasta
const removeBlog = async (id) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

export default { getAll , create, update, setToken, removeBlog}