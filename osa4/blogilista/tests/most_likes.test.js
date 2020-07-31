const listHelper = require('../utils/list_helper')

/**
 * Funktio, joka selvittää kirjoittajan, kenen blogeilla on eniten tykkäyksiä. 
 * Funktion paluuarvo kertoo myös suosikkiblogaajan likejen yhteenlasketun määrän.
 */
describe('author, who has most likes', () => {

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
    }
  ]

  //Testi, jossa etsitään kirjoittaja, kenen blogeilla on yhteensä eniten tykkäyksiä
  test('finds writer, who has most likes', () => {

    const vertailtavaOlio = {
      author: 'Edsger W. Dijkstra',
      likes: 20
    }

    const result = listHelper.mostLikes(blogsList)
    expect(result).toEqual(vertailtavaOlio)
  })
})