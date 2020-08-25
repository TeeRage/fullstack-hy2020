import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import anecdoteService from './services/anecdotes'

import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filters: filterReducer
})

const store = createStore(
    reducer, 
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes))  
)

export default store