const listHelper = require('../utils/list_helper')

/**
 * Funktio, joka selvittää millä blogilla on eniten tykkäyksiä
 */
describe('most liked blog in the database', () => {

  //Yksi blogi taulukossa
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  //Useampi blogi taulukossa
  const biggerList = [
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
    }
  ]
  
  //Testi jossa yhden blogin sisältävä taulukko, odotusarvona annettu vertailtavaOlio
  test('when list has only one blog, that blog is most liked', () => {

    const vertailtavaOlio = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(vertailtavaOlio)
  })

  //Testi jossa taulukollinen blogeja, odotusarvona annettu vertailtavaOlio
  test('finds most liked blog from a bigger list', () => {

    const vertailtavaOlio = {
      title: 'First class tests',
      author: 'Edsger W. Dijkstra',
      likes: 15
    }

    const result = listHelper.favouriteBlog(biggerList)
    expect(result).toEqual(vertailtavaOlio)
  })
})