import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

//Päivittää storen tilan muutosten yhteydessä?
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const App = () => {

  //Nappien painalluksien toiminnallisuudet
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  
  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>

      <h1>Statistics</h1>
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
