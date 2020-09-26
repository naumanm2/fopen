import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [ String! ]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
    }
  }
`

export const SET_YEAR = gql`
  mutation editAuthor($name: String!, $birthyear: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $birthyear
    ) {
      name
      born
    }
  }

`