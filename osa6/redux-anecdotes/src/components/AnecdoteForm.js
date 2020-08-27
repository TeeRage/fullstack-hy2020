/**
 * Uuden anekdootin luomiseen liittyvä logiikka.
 */
import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  //Uuden anekdootin lisääminen
  const addAnecdote = async (event) => {    
    
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.notify(`Lisäsit anekdootin '${content}'`, 5)
    props.createAnecdote(content)
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

//Koska komponentti ei tarvitse storen tilasta mitään, on funktion connect ensimmäinen parametri null.
export default connect(
  null, 
  { createAnecdote, notify },
)(AnecdoteForm)