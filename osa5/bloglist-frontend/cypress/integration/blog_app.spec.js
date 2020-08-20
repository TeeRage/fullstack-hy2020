/**
 * Testi, joka varmistaa, että sovellus näyttää oletusarvoisesti kirjautumislomakkeen.
 */
describe('Blog ', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})