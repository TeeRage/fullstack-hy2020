/**
 * Anekdoottilistan näyttäminen ja anekdoottien äänestämiseen liittyvä logiikka.
 */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()  
  const anecdotes = useSelector(state => state.anecdotes)
  
  //Metodi ilmoituksille, kestää 5 sekuntia
  const notifyWith = (message) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  //Anekdootin äänestäminen
  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    notifyWith(`Äänestit '${content}'`)
  }

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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList