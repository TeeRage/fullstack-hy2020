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

  //5.17: testaa, että kirjautumislomake ja sen komponentit näkyvät alussa
  it('5.17: Login from is shown', function() {
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  //5.18: testaa sekä onnistuneen että epäonnistuneen kirjautumisen
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

      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  //Testataan uuden blogin luominen (kirjautuneelle käyttäjälle)
  describe('When logged in', function() {

    beforeEach(function() {

      //Kirjaudutaan sisälle ennen testejä (määritetty /support/commands)
      cy.login({ username: 'mörkö', password: 'admin' })

      //Luodaan muutama blogi testausta varten (määritetty /support/commands)
      cy.createBlog({ title: 'Testiblogi', author: 'Kirjailija', url:'www.osoite.fi' })
      cy.createBlog({ title: 'Testiblogi2', author: 'Kirjailija', url:'www.osoite.fi' })
      cy.createBlog({ title: 'Testiblogi3', author: 'Kirjailija', url:'www.osoite.fi' })
    })

    //5.19: Testataan, että blogi voidaan lisätä
    it('5.19: A blog can be created', function() {

      //Luodaan uusi blogi
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

    //5.20: Testataan, että blogia voidaan likettää
    it('5.20: A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('Likes: 0')
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    //Testataan, että blogi voidaan poistaa
    it('5.21: Blog can be removed by user who added the blog', function() {
      cy.contains('Testiblogi2').contains('view').click()
      cy.contains('Testiblogi2').contains('Remove').click()
      cy.get('.success').contains('Blog has been removed')
      cy.get('html').should('not.contain', 'Testiblogi2')
    })

    //Testataan, että toisten käyttäjien lisäämää blogia ei voida poistaa
    it('5.21: Blog cannot be removed if not user who added the blog', function() {

      //Luodaan uusi käyttäjä, jolla kirjaudutaan sisään
      const user2 = {
        name: 'Muumi Peikko',
        username: 'muumi',
        password: 'salasana'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.visit('http://localhost:3000')

      //Remove-nappia ei pitäisi näkyä ollenkaan muiden lisäämissä blogeissa, testataan
      cy.login({ username: 'muumi', password: 'salasana' })
      cy.contains('Testiblogi3').contains('view').click()
      cy.get('html').should('not.contain', 'Remove')
    })
  })
})