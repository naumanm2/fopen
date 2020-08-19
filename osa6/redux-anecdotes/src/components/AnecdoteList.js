import React from 'react'
import { connect } from 'react-redux'
import { voteAnAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { filter } from '../reducers/filterReducer'


const AnecdoteList = (props) => {

  const voteAnecdote = (anecdote) => {
    props.voteAnAnecdote(anecdote)
    props.notification(`you voted for '${anecdote.content}'`, 5, props.timer.timer)
  }

  const currentAnecdotes = props.anecdotes
                            .sort((a, b) => b.votes - a.votes)
                            .filter(y => y.content.toLowerCase().match(props.currentFilter.toLowerCase()))

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


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    currentFilter: state.filter,
    timer: state.notification
  }
}

const mapDispatchToProps = {
  voteAnAnecdote,
  notification,
  filter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
