import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { toggleVisibility } from '../reducers/visibilityReducer'
import { filter } from '../reducers/filterReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const currentFilter = useSelector(state => state.filter)
  const currentAnecdotes = anecdotes.filter(y => y.content.toLowerCase().match(currentFilter.toLowerCase()))
  const dispatch = useDispatch()

  const voteAnecdote = (id, content) => {
    dispatch(voteAnAnecdote(id))
    dispatch(notification('VOTE', content))
    dispatch(toggleVisibility('SHOW'))
    setTimeout(() => {
      dispatch(toggleVisibility(''))
    }, 5000)
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
            <button onClick={() => {voteAnecdote(anecdote.id, anecdote.content)}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )


}

export default AnecdoteList
