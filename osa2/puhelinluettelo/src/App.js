import React, { useState } from 'react'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  //Lisätään henkilö persons-listaan
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    //Tarkistetaan, onko henkilö jo listassa
    if(persons.map(function(henkilo){return henkilo.name}).includes(newName)){
      window.alert(`${newName} löytyy jo puhelinluettelosta`);
    }
    else{
      setPersons(persons.concat(personObject))
      console.log("Nimi lisätty listaan: ", newName)
    }    
    setNewName('')
    setNewNumber('')
  }

  //Asetetaan uusi nimi newName muuttujalle
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  //Asetetaan uusi numero newNumber muuttujalle
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //Asetetaan uusi numero newNumber muuttujalle
  const handleSearch = (event) => {    
    setNewSearch(event.target.value)
    console.log(newSearch)
  }

  //Filtteröidään näytettävät nimet haun perusteella
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        Filter shown with: <input
          value={newSearch}
          onChange={handleSearch}
        />
      </form>

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow}/>
    </div>
  )
}

export default  App