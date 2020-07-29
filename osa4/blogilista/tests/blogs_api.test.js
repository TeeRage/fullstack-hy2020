const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

//Alustetaan ennen jokaista testiä sopiva testitietokanta
//Luodaan testeihin sopivat blogit tässä
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

//Tyhjennetään vanha kanta ennen testejä ja lisätään edellä luodut blogit
beforeEach(async () => {
  await Blog.deleteMany({})
  
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

/**
 * Tehtävä 4.8: blogilistan testit, step 1
 * Supertest-kirjastolla tehty testi blogilistan osoitteeseen /api/blogs tapahtuvalle HTTP GET -pyynnölle. 
 * Testaa, että sovellus palauttaa oikean määrän JSON-muotoisia blogeja (alussa luotujen blogien verran).
*/
test('4.8: all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    
  expect(response.body).toHaveLength(initialBlogs.length)
})

/**
 * Tehtävä 4.10: blogilistan testit, step3
 * Testi, joka varmistaa että sovellukseen voi lisätä blogeja osoitteeseen /api/blogs tapahtuvalla HTTP POST -pyynnöllä. 
 * Testaa myös, että blogien määrä kasvaa yhdellä, sekä että oikeansisältöinen blogi on lisätty järjestelmään.
*/
test('4.10: add one blog to database', async () => {

  //Uusi blogiolio testausta varten
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Tea Antila',
    url: 'www.osoite.fi',
    likes: 15
  }
  
  //Lisätään uusi blogi ja varmistetaan testillä, että lisäys onnistui (201) ja että data palautetaan oikeassa muodossa, eli että Content-Type:n arvo on application/json
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  //Haetaan tietokannan sisältö sekä mapataan blogien otsikot
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  
  //Testataan, että blogeja on nyt yksi enemmän kuin initial listassa sekä että uuden blogin otsikko löytyy joukosta
  expect(response.body).toHaveLength(initialBlogs.length+1)
  expect(contents).toContain('async/await simplifies making async calls')
})

//Lopuksi suljetaan yhteys tietokantaan
afterAll(() => {
  mongoose.connection.close()
})