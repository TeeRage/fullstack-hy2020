const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const body = request.body

  //Haetaan käyttäjä, joka vastaa annettuun käyttäjänimeen
  const user = await User.findOne({ username: body.username })

  //Tarkistetaan, onko käyttäjän antama salasana oikein
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  //Jos ei käyttäjätunnus ja salasana oikein
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  //Luodaan jwt token
  const token = jwt.sign(userForToken, process.env.SECRET)

  //Palautetaan token ja käyttäjän tiedot
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router