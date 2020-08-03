import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()



  const voteAnecdote = (id) => {
    dispatch(voteAnAnecdote(id))
  }


  return (
    <div>
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
    </div>
  )


}

export default AnecdoteList
