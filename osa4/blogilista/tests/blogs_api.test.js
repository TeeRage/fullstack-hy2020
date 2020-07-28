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
 * Tee supertest-kirjastolla testit blogilistan osoitteeseen /api/blogs tapahtuvalle HTTP GET -pyynnölle. 
 * Testaa, että sovellus palauttaa oikean määrän JSON-muotoisia blogeja (alussa luotujen blogien verran).
*/
test('4.8: all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    
  expect(response.body).toHaveLength(initialBlogs.length)
})

/**
 * Testaa, että pyyntöön vastataan statuskoodilla 200 ja että data palautetaan oikeassa muodossa, eli että Content-Type:n arvo on application/json.
 */
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

/**
 * Testaa, että tietty blogikirjoitus löytyy tietokannasta (voi sijaita missä vain kohtaa: toContain vs. toBe).
 */
test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(contents).toContain('Browser can execute only Javascript')
})

//Lopuksi suljetaan yhteys tietokantaan
afterAll(() => {
  mongoose.connection.close()
})