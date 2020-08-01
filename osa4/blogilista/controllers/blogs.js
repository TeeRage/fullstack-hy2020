/**
* Kaikki blogeihin liittyvien reittien määrittelyt löytyvät täältä.
* Router on middleware, jonka avulla on mahdollista määritellä joukko "toisiinsa liittyviä" routeja yhdessä paikassa, yleensä omassa moduulissaan.
*/
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Hakee ja näyttää kaikki blogikirjoitukset tietokannasta (async/await)
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))    
})

//Hakee yhden blogikirjoituksen id:n perusteella, async (käytössä express-async-errors, joten ei tarvi try catchia tai nextia)
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

//Lisää uuden blogikirjoitus tietokantaan (tämä käyttää nextiä ja try catchia ihan vain vertailun vuoksi)
blogsRouter.post('/', async (request, response, next) => {

  const body = request.body

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    }
  )

  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  } catch(exception){
    next(exception)
  }
})

//Poistaa blogikirjoituksen id:n perusteella (käytössä express-async-errors, joten ei tarvi try catchia)
blogsRouter.delete('/:id',  async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//Muokkaa olemassaolevaa blogikirjoitusta
blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog =  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter