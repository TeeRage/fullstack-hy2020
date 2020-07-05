import React from 'react';

//Yhteenlaskettu tehtävien lukumäärä
const Total = ({ course }) => {

    console.log("Total", course)
  
    //Reducer, luo yhden muuttujan kaikista arrayn muuttujista (summa tässä tapauksessa)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
    //Mapataan kurssien tehtävien lukumäärät uudeksi arrayksi
    const tehtavat = course.parts.map(function (kurssi){
      return kurssi.exercises
    } )
  
    //Käytetään uutta arrayta ja reduceria summan näyttämäiseen
    return(
      <h4>Tehtäviä yhteensä {tehtavat.reduce(reducer)}<br/></h4>
    )
  }
  
  //Kurssin sisällön renderöinti (saa propsit Content-komponentilta)
  const Part = (props) => {
    console.log("Part", props)
    return (
      <div> 
        {props.kurssi.parts.map(kurssi => <p key = {kurssi.id}> {kurssi.name} {kurssi.exercises}</p>)}
      </div>    
    )
  }
  
  //Kurssin sisällön renderöinti (saa propsit Course-komponentilta)
  const Content = ({ course }) => {
    console.log("Content", course)
    return (
      <div> 
        <Part kurssi={course}/>
      </div>
    )
  }
  
  //Kurssin nimen renderöinti (saa propsit Course-komponentilta)
  const Header = ({ course }) => {
    
    console.log("Header", course)
  
    return (
      <h3>{course.name}</h3>
    )
  }
  
  //yksittäisen kurssin muotoilusta huolehtiva komponentti (saa propsit App-komponentilta)
  const Course = ({ course }) => {
  
  console.log("Course", course)
  
    return (
      <div>
        <Header course = {course} />
        <Content course = {course} />
        <Total course = {course}/>
      </div>
    )
  }

  export default Course