import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {

  const [selected, setSelected] = useState(0)  
  const listaAanet = Array(props.anecdotes.length).fill(0)
  const [aanet, setAanet] = useState(listaAanet)

  //Nappi jolla äänestetään anekdoottia
  const aanestaClick = () => {
    console.log('lista nyt ', aanet)    
    const kopio = aanet.splice(0)
    kopio[selected] += 1
    setAanet(kopio)
    console.log('kopio ', kopio)
  }

  //Napin painallus luo satunnaismuuttujan, jota käytetään anekdootin arpomiseen
  const seuraavaAnekdoottiClick = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>Saanut {aanet[selected]} ääntä</p>
      <Button onClick={aanestaClick} text='Äänestä' />
      <Button onClick={seuraavaAnekdoottiClick} text='Seuraava anekdootti' />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)