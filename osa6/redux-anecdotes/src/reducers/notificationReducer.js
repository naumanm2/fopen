

export const notification = (act, anecdote) => {
  return {
    type: act,
    data: {
      act: act,
      content: anecdote
    }
  }

}



const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'VOTE':
      return `You voted for ${action.data.content}`
    case 'CREATE':
      return `added new anecdote ${action.data.content}`
    default:
      return state
  }

}

export default notificationReducer
