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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('naummax')
      cy.get('#password').type('mypassword')
      cy.contains('login').click()
      cy.contains('new blog').click()
      cy.get('#title').type('my testing the')
      cy.get('#author').type('max naum')
      cy.get('#url').type('www.bo.fi')
      cy.contains('create').click()
    })

    it('A blog can be created', function() {
      cy.get('.addblog').contains('new blog').click()
      cy.get('#title').type('my beautiful blogpost')
      cy.get('#author').type('max naum')
      cy.get('#url').type('www.go.fi')
      cy.contains('create').click()
      cy.get('.showOnDefault').should('contain', 'my beautiful blogpost')
      cy.contains('view').click()
      cy.get('.doNotShowOnDefault')
        .should('contain', 'www.go.fi')
        .should('contain', 'likes 0')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')

    })
  })

})
