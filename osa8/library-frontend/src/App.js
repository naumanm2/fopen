
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'


import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, LOGIN, CREATE_USER, USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState(null)
  const client = useApolloClient()


  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const user = useQuery(USER)
  console.log(filter)




    const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }




      if (!token) {
        return (
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => {
              setFilter(null)
              setPage('books')
            }}>books</button>
          <button onClick={() => setPage('login')}>login</button>
            <Authors
              show={page === 'authors'}
              authors={authors}
            />

            <Books
              show={page === 'books'}
              books={books}
            />
          <LoginForm
            show={page === 'login'}
            setError={setError}
            setToken={setToken}/>
        </div>
      )
    }
      return (
      <div>

        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => {
              setFilter(null)
              setPage('books')
            }}>books</button>
          <button onClick={() => setPage('add')}>add</button>
          <button onClick={() => {
              setFilter(user.data.me.favoriteGenre)
              setPage('books')
            }}>recommended</button>
          <button onClick={() => logout()}>logout</button>
        </div>
        <Authors
          show={page === 'authors'}
          authors={authors}
        />

        <Books
          show={page === 'books'}
          books={books}
          filter={filter}
        />
      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
