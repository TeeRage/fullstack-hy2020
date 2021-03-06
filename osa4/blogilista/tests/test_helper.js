/**
 * Testien apufunktio, jossa testitietokannan oliot ja funktio tietokannan sisällön hakemista varten.
 */
const Blog = require('../models/blog')
const User = require('../models/user')

//Lista blogeista, jotka lisätään testikantaan
const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Tea Antila',
    url: 'www.osoite.fi',
    likes: 20
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Tea Antila',
    url: 'www.osoite.fi',
    likes: 5
  },
  {
    title: 'Testiblogi 3',
    author: 'Tea Antila',
    url: 'www.osoite.fi',
    likes: 5
  }
]

//haetaan testitietokannassa olevat blogit
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}