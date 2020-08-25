/**
 * Anekdoottilistan näyttäminen ja anekdoottien äänestämiseen liittyvä logiikka.
 */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()  

  //Näytettävät anekdootit, filtteröinti
  const anecdotes = useSelector(state => {
    //Jos filtteri tyhjä, näytetään kaikki anekdootit
    if( state.filters === 'ALL'){
      return state.anecdotes
    }    
    else{ //Jos filtteriin kirjoitettu jotain, palautetaan filtteröity sisältö
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filters.toLowerCase()))
    }
  })

  //Metodi ilmoituksille, kestää 5 sekuntia
  const notifyWith = (message) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  //Anekdootin äänestäminen (+1 votes)
  const vote = async (anecdote) => {

    const newAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    
    dispatch(voteAnecdote(anecdote.id, newAnecdote))
    notifyWith(`Äänestit '${anecdote.content}'`)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList