describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'max',
      username: 'naummax',
      password: 'mypassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('naummax')
      cy.get('#password').type('mypassword')
      cy.contains('login').click()
      cy.contains('naummax logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('naummax')
      cy.get('#password').type('myBassword')
      cy.contains('login').click()
      cy.get('.error')
      .should('contain', 'wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
