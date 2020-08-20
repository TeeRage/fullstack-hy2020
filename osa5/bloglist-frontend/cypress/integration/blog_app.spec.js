/**
 * Cypress-testit E2E -testaukseen
 */
describe('Blog app', function() {

  beforeEach(function() {

    //Tyhjennetään testitietokanta ennen testejä
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    //Luodaan uusi käyttäjä backendille
    const user = {
      name: 'Esko Mörkö',
      username: 'mörkö',
      password: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    //Siirrytään aloitussivulle
    cy.visit('http://localhost:3000')
  })

  //5.17: testaa, että kirjautumislomake näkyy alussa
  it('5.17: Login from is shown', function() {
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  //5.18: testaa sekä onnistuneen että epäonnistuneen kirjautumisen.
  describe('5.18: Login',function() {

    it('succeeds with correct credentials', function() {
      cy.contains('login')
      cy.get('#username').type('mörkö')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('Esko Mörkö logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login')
      cy.get('#username').type('esko')
      cy.get('#password').type('xxx')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  //Testataan uuden blogin luominen (kirjautuneelle käytätjälle)
  describe('5.19: When logged in', function() {

    //Kirjaudutaan sisälle ennen testejä
    beforeEach(function() {
      cy.contains('login')
      cy.get('#username').type('mörkö')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
    })

    //Luodaan uusi blogi
    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Agathan blogi')
      cy.get('#author').type('Agatha Christie')
      cy.get('#url').type('www.testimaa.fi')
      cy.contains('create').click()
      cy.contains('A new blog')
      cy.contains('added')

      //Varmistetaan, että blogi tulee näkyviin
      cy.contains('Blogs')
      cy.contains('Agathan blogi')
      cy.contains('Agatha Christie')
      cy.contains('view')
    })

    //Blogia voidaan likettää
    it('A blog can be liked', function() {

      cy.contains('Create new blog').click()
      cy.get('#title').type('Testiblogi')
      cy.get('#author').type('Kirjailija')
      cy.get('#url').type('www.testimaa.fi')
      cy.contains('create').click()
      cy.contains('A new blog')
      cy.contains('added')

      //Varmistetaan, että blogi tulee näkyviin
      cy.contains('Blogs')
      cy.contains('Testiblogi')
      cy.contains('Kirjailija')
      cy.contains('view').click()
      cy.contains('like').click()
    })
  })
})