/* eslint-disable no-undef */
//const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//Skeema MongoDB:n tietokantaa varten
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

//Uusi blogiolio, joka käyttää skeemaa
const Blog = mongoose.model('Blog', blogSchema)

//Yhdistetään MongoDB Atlaksen tietokantaan
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

//Middlewareja
app.use(cors())
app.use(express.json())

//Hae ja näytä kaikki blogikirjoitukset tietokannasta
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

//Lisää uusi blogikirjoitus tietokantaan
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

//Yhteyden muodostaminen
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})