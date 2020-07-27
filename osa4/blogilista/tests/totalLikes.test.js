const listHelper = require('../utils/list_helper')

/**
 * Funktio, joka palauttaa blogien yhteenlaskettujen tykkäysten eli likejen määrän.
 * Kolme erilaista testiä, joissa annetaan testattavaksi taulukko blogeista.
 */
describe('total likes', () => {

  //Tyhjä taulukko
  const emptyList = []

  //Yksi blogi taulukossa, likes = 5
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

  //Useampi blogi taulukossa, yhteenlaskettu likes = 31
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

  //Testi jossa syötteenä tyhjä taulukko, odotusarvo 0
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
  
  //Testi jossa yhden blogin sisältävä taulukko, odotusarvo 5
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  //Testi jossa taulukollinen blogeja, odotusarvo 31
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList)
    expect(result).toBe(31)
  })
})