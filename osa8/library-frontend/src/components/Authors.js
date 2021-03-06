import React, {useState, useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { SET_YEAR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [year, setYear] = useState('')
  const [name, setName] = useState('')
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  const editAuthor = useMutation(SET_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS}]
  })

  if (!props.show) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    editAuthor[0]({
      variables: {
        name,
        birthyear: year
      }
    })
    setYear('')
    setName('')
  }


  if (authors.loading) {
    return <div>loading...</div>
  }

  return (<div>
    <h2>authors</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            born
          </th>
          <th>
            books
          </th>
        </tr>
        {
          authors.map(a => <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>)
        }
      </tbody>
    </table>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <select
            value={name}
            onChange={({target}) => setName(target.value)}
            >
              {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          birthyear
          <input
            type="number"
            value={year}
            onChange={({target}) => setYear(target.valueAsNumber)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  </div>)
}

export default Authors
