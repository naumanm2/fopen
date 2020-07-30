import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const setBtate = (props) => {
    store.dispatch({
      type: props
    })
  }

  return (
    <div>
      <button onClick={() => setBtate('GOOD')}>good</button>
      <button onClick={() => setBtate('OK')}>neutral</button>
      <button onClick={() => setBtate('BAD')}>bad</button>
      <button onClick={() => setBtate('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
