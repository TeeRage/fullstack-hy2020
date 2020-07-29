/**
* Blogien skeeman määrittely
*/

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

//Skeema MongoDB:n tietokantaa varten
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  likes: {
    type: Number,
    required: true
  }
})

//Selkeyden vuoksi muokataan saatua dokumenttia (ei näytä MongoDB:n omia kenttiä ja selkeytetään id:n näyttämistä)
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)