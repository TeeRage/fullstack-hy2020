const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

//Apufunktio, joka hakee tokenin otsikosta
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

//Hae kaikki blogit
router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//Poistaa tietyn blogin
router.delete('/:id', async (request, response) => {

  console.log('\n\nBody:', request.body)

  //Tarkistetaan token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  //Jos token ei täsmää tai se puuttuu
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  //Jos poistaja ei ole blogin luoja
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }

  //Poistetaan blogi
  await blog.remove()
  user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

//Päivittää blogin
router.put('/:id', async (request, response) => {
  console.log('\n\nPäivitettävän blogin tiedot:', request.body)
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  console.log('\n\nPäivitetty:', request.body)
  response.json(updatedBlog.toJSON())
})

//Lisää uuden blogin
router.post('/', async (request, response) => {

  const blog = new Blog(request.body)

  //Tarkistetaan, onko annettu käyttäjätoken oikein
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  //Jos ei ole molempia tokeneita tai tokeneissa vikaa
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  //Haetaan käyttäjä tokenin avulla
  const user = await User.findById(decodedToken.id)

  //Jos blogin url tai title puuttuu
  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  //Luodaan likes=0 jos ei ole määritelty likes
  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  
  await user.save()
  response.status(201).json(savedBlog)
})



module.exports = router