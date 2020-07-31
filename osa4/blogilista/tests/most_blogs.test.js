const listHelper = require('../utils/list_helper')

/**
 * Funktio, joka  selvittää kirjoittajan, kenellä on eniten blogeja. 
 * Funktion paluuarvo kertoo myös ennätysblogaajan blogien määrän.
 */
describe('author, who has most blogs written', () => {

  const blogsList = [
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f5',
      title: 'First class tests',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Go To Statement Considered Harmful',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Traveling salesman problem',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
  ]

  //Testi, jossa etsitään eniten blogeja kirjoittanut kirjailija ja blogien lukumäärä
  test('finds writer, who has most blogs and tells how many blogs he/she has', () => {

    const vertailtavaOlio = {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    }

    const result = listHelper.mostBlogs(blogsList)
    expect(result).toEqual(vertailtavaOlio)
  })
})