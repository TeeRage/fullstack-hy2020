const listHelper = require('../utils/list_helper')

/**
 * Testatataan jest-tetsien toimivuutta.
 * Annetaan tyhjä array, testin pitäisi palauttaa 1.
 */
test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})