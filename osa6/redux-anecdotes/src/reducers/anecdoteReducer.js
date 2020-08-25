import anecdoteService from '../services/anecdotes'

//Reducer
const anecdoteReducer = (state = [], action) => {

  //console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){

    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }

      //Mapataan anekdootit listaan (järjestämättömänä)
      const anekdootit = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      
      //Järjestetään anekdootit äänimäärän mukaan ennen palauttamista
      return anekdootit.sort((a,b) => (a.votes < b.votes) ? 1 : -1)
    
    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data
        
    default: return state
  }   
}

//Tietokannasta anekdoottien hakeminen käynnistyksen yhteydessä
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    
    //Järjestetään anekdootit tykkäysten mukaan
    anecdotes.sort((a,b) => (a.votes < b.votes) ? 1 : -1)

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })    
  }
}

//Uuden anekdootin luominen, backend generoi id:n automaagisesti
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

//Anekdootin äänestäminen, content saadaan AnecdoteList.js -tiedostolta
export const voteAnecdote = (id, content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.voteAnecdote(id, content)
    dispatch ({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer