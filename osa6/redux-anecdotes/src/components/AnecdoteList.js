import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { filter } from '../reducers/filterReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const currentFilter = useSelector(state => state.filter)
  const currentAnecdotes = anecdotes
                            .sort((a, b) => b.votes - a.votes)
                            .filter(y => y.content.toLowerCase().match(currentFilter.toLowerCase()))
  const dispatch = useDispatch()

  const voteAnecdote = (anecdote) => {
    dispatch(voteAnAnecdote(anecdote))
    dispatch(notification(`you voted for '${anecdote.content}'`, 5))
    dispatch(filter(currentFilter))
  }


  return (
    <div>
      {currentAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {voteAnecdote(anecdote)}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )


}

export default AnecdoteList
