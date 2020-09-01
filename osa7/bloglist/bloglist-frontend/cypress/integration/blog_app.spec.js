describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'max',
      username: 'naummax',
      password: 'mypassword'
    }
    const wronguser = {
      name: 'lax',
      username: 'laummax',
      password: 'mypassword'
    }
    const blog1 = {
      author: 'uno',
      user: user,
      title: 'firstblog',
      url: 'f.com',
      likes: 500
    }
    const blog2 = {
      author: 'dos',
      user: user,
      title: 'secondblog',
      url: 'f.com',
      likes: 200
    }
    const blog3 = {
      author: 'dos',
      user: user,
      title: 'thirdblog',
      url: 'f.com',
      likes: 9000
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', wronguser)
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

  describe('When logged in', function() {
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

    it('A blog can only be removed by a valid user', function() {
      cy.contains('logout').click()
      cy.contains('log in').click()
      cy.get('#username').type('laummax')
      cy.get('#password').type('mypassword')
      cy.contains('login').click()
      cy.contains('view').click()
      cy.get('.doNotShowOnDefault')
      cy.get('.removebutton')
        .should('have.attr', 'style', 'display: none;')

      cy.contains('logout').click()
      cy.contains('log in').click()
      cy.get('#username').type('naummax')
      cy.get('#password').type('mypassword')
      cy.contains('login').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'my testing the')


    })
  })

  it('Blogs print in order of liking', function() {
    cy.login({username: 'naummax', password: 'mypassword'})
    const user = {
      name: 'max',
      username: 'naummax',
      password: 'mypassword'
    }
    cy.postBlog({
      author: 'uno',
      user: user,
      title: 'firstblog',
      url: 'f.com',
      likes: 500
    })
    cy.postBlog({
      author: 'dos',
      user: user,
      title: 'secondblog',
      url: 'f.com',
      likes: 200
    })
    cy.postBlog({
      author: 'dos',
      user: user,
      title: 'thirdblog',
      url: 'f.com',
      likes: 9000
    })
    cy.request('GET', 'http://localhost:3001/api/blogs')
      .then(blogs => {
        const sortedBlogs = blogs.body.sort( (a, b) => b.likes - a.likes)
        cy.wrap(sortedBlogs).should("equal", blogs.body)
      })
  })
})
