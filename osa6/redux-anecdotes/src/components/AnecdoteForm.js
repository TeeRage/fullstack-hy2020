/**
 * Uuden anekdootin luomiseen liittyvä logiikka.
 */
import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()  

  //Metodi ilmoituksille, kestää 5 sekuntia
  const notifyWith = (message) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  } 

  //Uuden anekdootin lisääminen
  const addAnecdote = async (event) => {    
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    notifyWith(`Lisäsit anekdootin '${content}'`)
  }

  //Form lisäämiselle
  return (
    <div>
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

export default AnecdoteForm