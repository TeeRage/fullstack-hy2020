import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

//1.8: unicafe step3
const Statistics = (props) => {
  return (
    <div>
      <p>Hyvä {props.hyva}</p>
      <p>Neutraali {props.neutraali}</p>
      <p>Huono {props.huono}</p>
      <p>Yhteensä {props.kpl}</p>      
      <p>Keskiarvo {(props.hyva - props.huono)/props.kpl}</p>
      <p>Positiivisia {props.hyva/props.kpl*100} %</p>
    </div>
  )
}

const App = (props) => {

  const [hyva, setHyva] = useState(0)
  const [neutraali, setNeutraali] = useState(0)
  const [huono, setHuono] = useState(0) 
  const [kpl, setKpl] = useState(0)

  const handleHyvaClick = () => {
    setHyva(hyva + 1)
    setKpl(kpl + 1)
  }

  const handleNeutraaliClick = () => {
    setNeutraali(neutraali + 1)
    setKpl(kpl + 1)
  }

  const handleHuonoClick = () => {
    setHuono(huono + 1)
    setKpl(kpl + 1)
  }

  return (
    <div>

      <h1>Anna meille palautetta</h1>
      <Button onClick={handleHyvaClick} text='Hyvä' />
      <Button onClick={handleNeutraaliClick} text='Neutraali' />
      <Button onClick={handleHuonoClick} text='Huono' />

      <h1>Tilastot</h1>
      <Statistics hyva = {hyva} neutraali = {neutraali} huono = {huono} kpl = {kpl}/>     

    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)