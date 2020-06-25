import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part osa={props.exercises.part1} harjoituksia={props.exercises.exercises1}/>
      <Part osa={props.exercises.part2} harjoituksia={props.exercises.exercises2}/>
      <Part osa={props.exercises.part3} harjoituksia={props.exercises.exercises3}/>
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
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course}/>
      <Content exercises = {{part1:part1.name, exercises1:part1.exercises, part2:part2.name, exercises2:part2.exercises, part3:part3.name, exercises3: part3.exercises}} />
      <Total total = {part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
