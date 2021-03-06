import React, { useState } from 'react'
import  { useField } from './hooks/index'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect, useParams
} from "react-router-dom"

//Linkit, joiden avulla sovelluksessa muutetaan näkymää
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

//Anekdoottien listan näyttäminen
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>)}
    </ul>
  </div>
)

//Yksittäisen anekdootin tietojen näyttäminen
const Anecdote = ({ anecdotes }) => {

  const id = useParams().id
  const anecdoteFound =  anecdotes.find(a => a.id === id)

  return (
    <div>
      <h2>{anecdoteFound.content} by {anecdoteFound.author}</h2>
      <p>Has {anecdoteFound.votes} votes</p>
      <p>For more info see <a href = {anecdoteFound.info}>{anecdoteFound.info}</a></p>
    </div>
  )
}

//About-näkymä
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

//Footer, aina näkyvissä
const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

//Uuden anekdootin luomiseen liittyvä näkumä ja logiikka
const CreateNew = (props) => {

   //Käytetään custom hookia useField (hooks/index) ja nimetään käytettävät muuttujat ja niiden "tyhjennysfunktiot"
  const {bind:content, reset:resetContent} = useField()
  const {bind:author, reset:resetAuthor} = useField()
  const {bind:info, reset:resetInfo} = useField()

  const handleSubmit = (e) => {

    e.preventDefault()
    
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }  

  //Tyhjennetään lomakkeeseen syötetty teksti
  const resetForm = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button 
          type="submit" 
          name="button_create">
            create
        </button> 
        <button 
          name="button_reset" 
          onClick={resetForm}>
            reset
          </button>
      </form>
    </div>
  )
}//CreateNew

const Notification = (props) => {
  
  const style = {
    padding: 10
  }

  if (props.notification === ''){
    return null
  }

  return (
    <div id='notificationDiv' style={style}>
      {props.notification}
    </div>
  )
}

//App
const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]) 

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    
    setNotification(`A new anecdote '${anecdote.content}' created!`)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))    

    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
        <h1>Software anecdotes</h1>
        <Menu />        
        <Notification notification = {notification}/>
        <Switch>            
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/create">
            {notification === '' ? <CreateNew addNew={addNew} /> : <Redirect to="/" />}
          </Route>          
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>  
        </Switch>
        <br/>
        <Footer />
    </Router>
  )
}//App

export default App;
