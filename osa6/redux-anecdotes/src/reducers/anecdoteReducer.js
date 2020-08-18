import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const newAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(anecdote))
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const oldAnecdote = state.find(x => x.id === id)
      const newAnecdote = {
        ...oldAnecdote,
        votes: oldAnecdote.votes + 1
      }
    return state
        .map(x => x.id !== id ? x : newAnecdote)
        .sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
