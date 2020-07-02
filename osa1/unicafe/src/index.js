import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {

  if (props.kpl == 0){
    return (
      <div>
        <p>Palautetta ei ole vielä annettu</p>
      </div>
    )
  }

  else {
    return (
      <div>
        <StatisticLine text = "Hyvä" value = {props.hyva} />
        <StatisticLine text = "Neutraali" value = {props.neutraali} />
        <StatisticLine text = "Huono" value = {props.huono} />
        <StatisticLine text = "Yhteensä" value = {props.kpl} />
        <StatisticLine text = "Keskiarvo" value = {(props.hyva - props.huono)/props.kpl} />
        <StatisticLine text = "Positiivisia" value = {props.hyva/props.kpl*100 + ' %' }/>
      </div>
    )
  }
}

const StatisticLine  = (props) => {  
  return (
    <div>
      <p>{props.text} {props.value}</p>
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