/**
* Kaikki käyttäjiin liittyvien reittien määrittelyt löytyvät täältä.
*/
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

//Lisää uuden userin tietokantaan
usersRouter.post('/', async (request, response) => {

  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  if (body.password.length < 3){
    console.log('User validation failed: password: Path `password` is shorter than the minimum allowed length (3).')
    return response.status(400).json({error: 'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).'})
  }
  else{
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

//Hakee yhden käyttäjän id:n perusteella, async (käytössä express-async-errors, joten ei tarvi try catchia tai nextia)
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

//Poistaa käyttäjän id:n perusteella (käytössä express-async-errors, joten ei tarvi try catchia)
usersRouter.delete('/:id',  async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter