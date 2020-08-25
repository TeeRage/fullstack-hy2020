//Uuden anekdootin luominen, backend generoi id:n automaagisesti
export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
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
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
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