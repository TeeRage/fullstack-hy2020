import React from 'react';
import ReactDOM from 'react-dom';

//Yhteenlaskettu tehtävien lukumäärä
const Total = ({ course }) => {

  //Reducer, luo yhden muuttujan kaikista arrayn muuttujista (summa tässä tapauksessa)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  //Mapataan kurssien tehtävien lukumäärät uudeksi arrayksi
  const tehtavat = course.parts.map(function (kurssi){
    return kurssi.exercises
  } )

  //Käytetään uutta arrayta ja reduceria summan näyttämäiseen
  return(
    <h4>Tehtäviä yhteensä {tehtavat.reduce(reducer)}</h4>
  ) 
}


//Kurssin sisällön renderöinti (saa propsit Content-komponentilta)
const Part = (props) => {
  return (
    <div> 
      {props.kurssi.parts.map(kurssi => <p key = {kurssi.id}> {kurssi.name} {kurssi.exercises}</p>)}
    </div>    
  )
}

//Kurssin sisällön renderöinti (saa propsit Course-komponentilta)
const Content = ({ course }) => {
  return (
    <div> 
      <Part kurssi={course}/>
    </div>
  )
}

//Kurssin nimen renderöinti (saa propsit Course-komponentilta)
const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

//yksittäisen kurssin muotoilusta huolehtiva komponentti (saa propsit App-komponentilta)
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course = {course}/>
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'Tietorakenteet ja algoritmit',
        exercises: 12,
        id: 3
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))