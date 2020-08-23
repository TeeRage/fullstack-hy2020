import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Satunnainen id
const generateId = () => (100000 * Math.random()).toFixed(0)

const App = () => {

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  //Anekdootin äänestäminen
  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      data: { id }
    })    
  }

  //Uuden anekdootin lisääminen
  const addAnecdote = (event) => {    
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: generateId(),
        votes: 0
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App