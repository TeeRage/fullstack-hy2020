import React from 'react'
import Person from './Person'

const Persons = (props) => {

    return (
        props.personsToShow.map((nimi, i) => <Person key ={i} person={nimi}/>)
    )
}

export default Persons