const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

//Alustetaan ennen jokaista testiä sopiva testitietokanta test_helperin avulla
//Tyhjennetään vanha kanta ennen testejä ja lisätään edellä luodut blogit
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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
    
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

/**
 * Tehtävä 4.9: blogilistan testit, step 1
 * Testi, joka varmistaa että palautettujen blogien identifioivan kentän tulee olla nimeltään id.
 * Hakee testitietokannan sisällön ja sieltä ensimmäisen blogin, jonka id:n olemassaolon tarkistaa.
*/
test('4.9: blog object has a field named id', async () => {  
  const allBlogs = await helper.blogsInDb()
  const blogToView = allBlogs[0]
  expect(blogToView.id).toBeDefined()
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
  expect(response.body).toHaveLength(helper.initialBlogs.length+1)
  expect(contents).toContain('async/await simplifies making async calls')
})

/**
 * 4.11*: blogilistan testit, step4
 * Testi joka varmistaa, että jos kentälle likes ei anneta arvoa, asetetaan sen arvoksi 0.
 *  Muiden kenttien sisällöstä ei tässä tehtävässä vielä välitetä.
*/
test('4.11: blog without likes value is added with 0 likes', async () => {

  //Uusi blogiolio ilman (likes-arvoa) testausta varten
  const newBlog = {
    title: 'This blog is not liked at all',
    author: 'Tea Antila',
    url: 'www.osoite.fi'
  }
  
  //Lisätään blogi sekä testataan, että lisäys onnistuu (201)
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  //Tarkistetaan, että blogi jonka otsikko on This blog is not liked at all löytyy tietokannasta
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContain('This blog is not liked at all')
})

/**
 * 4.12*: blogilistan testit, step4
 * Testi joka varmistaa, että jos uusi blogi ei sisällä kenttiä title ja url, pyyntöön vastataan statuskoodilla 400 Bad request
 *  Muiden kenttien sisällöstä ei tässä tehtävässä vielä välitetä.
*/
test('4.12: blog without title and url content is not added', async () => {

  //Uusi blogiolio ilman titleä sekä url:ää testausta varten
  const newBlog = {
    author: 'Tea Antila',
    likes: 40
  }
  
  //Lisätään blogi sekä testataan, että lisäys ei onnistu (400)
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  //Haetaan tietokannan sisältö ja tarkistetaan, että blogia ei lisätty
  const response = await api.get('/api/blogs')   
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

//Lopuksi suljetaan yhteys tietokantaan
afterAll(() => {
  mongoose.connection.close()
})