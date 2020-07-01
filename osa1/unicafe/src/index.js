import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  
  const [hyva, setHyva] = useState(0)
  const [neutraali, setNeutraali] = useState(0)
  const [huono, setHuono] = useState(0)

  const handleHyvaClick = () => {
    setHyva(hyva + 1)
  }

  const handleNeutraaliClick = () => {
    setNeutraali(neutraali + 1)
  }

  const handleHuonoClick = () => {
    setHuono(huono + 1)
  }

  return (
    <div>
      <h1>Anna meille palautetta</h1>
      <div>        
        <Button onClick={handleHyvaClick} text='Hyvä' />
        <Button onClick={handleNeutraaliClick} text='Neutraali' />
        <Button onClick={handleHuonoClick} text='Huono' />        
      </div>
      <h1>Tilastot</h1>
      <p>Hyvä {hyva}</p>
      <p>Neutraali {neutraali}</p>
      <p>Huono {huono}</p>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)