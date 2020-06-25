import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.olio.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part osa={props.olio.parts[0].name} harjoituksia={props.olio.parts[0].exercises}/>
      <Part osa={props.olio.parts[1].name} harjoituksia={props.olio.parts[1].exercises}/>
      <Part osa={props.olio.parts[2].name} harjoituksia={props.olio.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.osa} {props.harjoituksia}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.olio.parts[0].exercises + props.olio.parts[1].exercises + props.olio.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {

  const course = {

    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header olio = {course}/>
      <Content olio = {course} />
      <Total olio = {course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
