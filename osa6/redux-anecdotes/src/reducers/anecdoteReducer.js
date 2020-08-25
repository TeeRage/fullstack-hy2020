import anecdoteService from '../services/anecdotes'

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

//Anekdootin äänestäminen
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

//Tietokannasta anekdoottien hakeminen käynnistyksen yhteydessä
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })    
  }
}

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

export default anecdoteReducer