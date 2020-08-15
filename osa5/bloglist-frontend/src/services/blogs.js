import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

//Kirjautuneen käyttäjän token
const setToken = newToken => {
  token = `bearer ${newToken}`
}

//Hae kaikki blogit tietokannasta
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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
const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll , create, update, setToken}