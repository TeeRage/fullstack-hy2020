/**
 * Kirjautuminen käyttäjätunnuksella ja salasanalla.
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  //Etsitään tietokannasta käyttäjä, joka täsmää annettuun käyttäjätunnukseen
  const user = await User.findOne({ username: body.username })

  //Tarkistetaan salasanan täsmäävyys
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  //Jos salasana on väärin tai käyttäjää ei ole olemassa
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  //Jos salasana oikein, luodaan jwt:n avulla token, joka sisältää digitaalisesti allekirjoitetussa muodossa kt:n ja id:n
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  //Onnistunut pyyntö
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter