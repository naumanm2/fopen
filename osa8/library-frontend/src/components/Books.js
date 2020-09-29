import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }
  let msg = ''

  let books = props.books.data.allBooks
  if (props.filter) {
    console.log(books)
    msg = 'books specifically for you'
    books = books.filter(x => x.genres.indexOf(props.filter)>-1)
  }


  return (
    <div>
      <h2>books</h2>
      <h3>{msg}</h3>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
