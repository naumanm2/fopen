import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { filter } from '../reducers/filterReducer'

const AnecdoteForm = (props) => {


  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.createanecdote.value
    event.target.createanecdote.value = ''
    props.newAnecdote(content)
    props.notification(`added anecdote '${content}'`, 5)
    props.filter(props.currentFilter)

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

const mapStateToProps = (state) => {
  return {
    currentFilter: state.filter
  }

}

const mapDispatchToProps = {
  newAnecdote,
  notification,
  filter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)
