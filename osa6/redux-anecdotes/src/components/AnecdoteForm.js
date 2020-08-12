import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { toggleVisibility } from '../reducers/visibilityReducer'
import { filter } from '../reducers/filterReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const currentFilter = useSelector(state => state.filter)


  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.createanecdote.value
    event.target.createanecdote.value = ''
    dispatch(newAnecdote(content))
    dispatch(notification('CREATE', content))
    dispatch(toggleVisibility('SHOW'))
    dispatch(filter(currentFilter))
    setTimeout(() => {
      dispatch(toggleVisibility(''))
    }, 5000)

  }

  return (
    <div>
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

export default AnecdoteForm
