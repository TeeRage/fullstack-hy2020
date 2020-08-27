/**
 * Anekdoottilistan anekdoottien näyttämiseenen ja äänestämiseen liittyvä logiikka.
 */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

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

  //Anekdootin äänestäminen (+1 votes)
  const vote = async (anecdote) => {

    const newAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    
    dispatch(voteAnecdote(anecdote.id, newAnecdote))
    dispatch(notify(`Äänestit '${anecdote.content}'`, 5))
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