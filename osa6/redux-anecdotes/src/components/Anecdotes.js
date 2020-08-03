import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnAnecdote, newAnecdote } from '../reducers/anecdoteReducer'


const Anecdotes = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.createanecdote.value
    event.target.createanecdote.value = ''
    dispatch(newAnecdote(content))
  }

  const voteAnecdote = (id) => {
    dispatch(voteAnAnecdote(id))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {voteAnecdote(anecdote.id)}}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input id="createanecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )


}

export default Anecdotes
