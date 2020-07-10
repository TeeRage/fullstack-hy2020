import React, { useState, useEffect } from 'react'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  //Haetaan puhelinluettelo json-serveriltä portista 3001 (db.json sisältää tietokannan) käyttämällä personService-moduulia
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  //Henkilön lisääminen puhelinluetteloon
  const addPerson = (event) => {

    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    //Tarkistetaan, onko henkilö jo listassa 
    if(persons.map(function(henkilo){return henkilo.name}).includes(newName)){

      //Jos henkilö löytyy jo ja käyttäjä haluaa korvata vanhan numeron
      if(window.confirm('Henkilö on jo puhelinluettelosta. Haluatko korvata vanhan puhelinnumeron?')){

        //Haetaan dublikaatin id-numero, jotta tiedetään minne päivitys tehdään
        const idNumero = persons[persons.map(function(henkilo){return henkilo.name}).indexOf(newName)].id

        personService
        .update(idNumero, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== idNumero ? person : response))
        })

      console.log("Puhelinnumero muutettu")
      }    
    }    
    else{
      //Synkronoidaan lisääminen palvelimelle
      personService
      .create(personObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
      })
      console.log("Nimi lisätty puhelinluetteloon: ", newName)
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

  //Metodi henkilön poistamiseksi
  const delPerson = id => {

    if(window.confirm('Oletko varma')){
        personService
        .delPerson(id)
        .then(response => {
            personService
            .getAll()
            .then(initialPersons => {
            setPersons(initialPersons)
        })
    })
    console.log("Henkilö poistettu puhelinluettelosta")
    }        
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
      <Persons personsToShow = {personsToShow} delPerson = {delPerson}/>
    </div>
  )
}

export default  App