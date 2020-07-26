/**
* Kaikki blogeihin liittyvien reittien määrittelyt löytyvät täältä.
* Router on middleware, jonka avulla on mahdollista määritellä joukko "toisiinsa liittyviä" routeja yhdessä paikassa, yleensä omassa moduulissaan.
*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Hakee ja näyttää kaikki blogikirjoitukset tietokannasta
blogsRouter.get('/', (request, response) => {

  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})

//Hakee yhden blogikirjoituksen id:n perusteella
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//Lisää uuden blogikirjoitus tietokantaan
blogsRouter.post('/', (request, response, next) => {

  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

//Poistaa blogikirjoituksen id:n perusteella
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter