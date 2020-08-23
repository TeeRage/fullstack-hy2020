/**
 * Anekdoottilistan näyttäminen ja anekdoottien äänestämiseen liittyvä logiikka.
 */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()  
  const anecdotes = useSelector(state => state)

  //Anekdootin äänestäminen
  const vote = (id) => {dispatch(voteAnecdote(id))}

  //Näytetään lista anekdooteista
  return (
    <div>      
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
    </div>
  )
}

export default AnecdoteList