/**
 * Cypress-testit E2E -testaukseen.
 * Alussa kokeiltu erilaisia tapoja tehdä asioita, kaikki eivät ole välttämättä hyvän tavan mukaisia.
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

  //Testit sisäänkirjautuneelle käyttäjälle
  describe('When logged in', function() {

    beforeEach(function() {

      //Kirjaudutaan sisälle ennen testejä (määritetty /support/commands)
      cy.login({ username: 'mörkö', password: 'admin' })

      //Luodaan muutama blogi testausta varten (määritetty /support/commands)
      cy.createBlog({ title: 'Testiblogi1', author: 'Kirjailija', url:'www.osoite.fi', likes:5 })
      cy.createBlog({ title: 'Testiblogi2', author: 'Kirjailija', url:'www.osoite.fi', likes:9 })
      cy.createBlog({ title: 'Testiblogi3', author: 'Kirjailija', url:'www.osoite.fi', likes:3 })
    })

    //5.19: Testataan, että blogi voidaan lisätä
    it('5.19: A blog can be created', function() {

      //Luodaan uusi blogi
      //cy.get('#toggleVisibilityButton').click()
      cy.contains('Create new blog').click()
      cy.get('#title').type('Agathan blogi')
      cy.get('#author').type('Agatha Christie')
      cy.get('#url').type('www.testimaa.fi')
      cy.get('#createBlogButton').click()

      //Varmistetaan, että luominen onnistui ja blogi tulee näkyviin
      cy.get('.success').should('contain','A new blog').and('contain', 'added')
      cy.get('.blog').should('contain', 'Agathan blogi')
    })

    //5.20: Testataan, että blogia voidaan likettää
    it('5.20: A blog can be liked', function() {
      cy.contains('Testiblogi1').contains('view').click()
      cy.contains('Testiblogi1').contains(5)
      cy.contains('Testiblogi1').contains('like').click()
      cy.contains('Testiblogi1').contains(6)
    })

    //Testataan, että blogi voidaan poistaa
    it('5.21: Blog can be removed by user who added the blog', function() {
      cy.contains('Testiblogi2').contains('view').click()
      cy.contains('Testiblogi2').contains('Remove').click()
      cy.get('.success').contains('Blog has been removed')
      cy.get('html').should('not.contain', 'Testiblogi2')
    })

    //Testataan, että toisten käyttäjien lisäämää blogia ei voida poistaa
    it('5.21: blog cannot be removed if not user who added the blog', function() {

      //Luodaan uusi käyttäjä, jolla kirjaudutaan sisään
      const user2 = {
        name: 'Muumi Peikko',
        username: 'muumi',
        password: 'salasana'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)

      //Kirjaudutaan ulos käyttäjätililtä, joka loi kaikki blogit ja kirjaudutaan sisään uudella tilillä
      cy.get('#logout-button').click()
      cy.login({ username: 'muumi', password: 'salasana' })

      //Remove-nappia ei pitäisi näkyä ollenkaan muiden lisäämissä blogeissa, testataan
      cy.contains('Testiblogi3').contains('view').click()
      cy.get('html').should('not.contain', 'Remove')

    })//5.21: blog cannot be removed....

    //Testataan, että blogit on likejen mukaisessa järjestyksessä suurimmasta pienimpään
    it('5.22: blogs are ordered by likes', function() {

      let edellinen = 9999999999

      //Etsitään kaikki blogit
      cy.get('.blog').then( blogs => {

        //Haetaan blogioliot ja klikataan ne auki
        cy.get(blogs).each( () => {
          cy.contains('view').click().then(() => {
          })
        })
      })

      //Haetaan kaikki avatut lisätiedot ja vertaillaan likejen määrää
      cy.get('div.togglableContent').then( ($divi) => {

        cy.get($divi).then( () => {

          //Otetaan yksittäisen blogin tykkäys ja verrataan sitä aina edellisen blogin tykkäysten määrään
          cy.get('[data-testid=likes-amount]').each(($likes) => {
            const lik = parseInt($likes.text())
            expect(edellinen).to.be.at.least(lik)
            edellinen = lik
          })
        })
      })
    })//it('5.22: blogs are ordered by likes'
  })//describe('When logged in',
})