import React from 'react'
import Person from './Person'

const Persons = (props) => {

    return (
        props.personsToShow.map((nimi, i) => <Person key ={i} person={nimi} delPerson = {() => props.delPerson(nimi.id)}/>)
    )
}

export default Persons