import React, { useState, useEffect } from 'react'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [newSearch, setNewSearch ] = useState('')
  const [notification, setNotification ] = useState(null)

  //Haetaan puhelinluettelo json-serveriltä portista 3001 (db.json sisältää tietokannan) käyttämällä personService-moduulia
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //Metodi ilmoituksille, kestää 2 sekuntia
  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

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
          notifyWith(`Henkilön '${personObject.name}' puhelinnumero muutettu`)
          console.log(`Henkilön '${personObject.name}' puhelinnumero muutettu`)
        })
        .catch(error => {
          notifyWith(`${error.response.data.error} `, 'error')
          console.log('Virhe puhelinnnumeron muuttamisessa')
        })                    
      }    
    }
    else{
      //Uuden henkilön lisääminen: Synkronoidaan palvelimelle
      personService
      .create(personObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        notifyWith(`Henkilö  '${personObject.name}' lisätty puhelinluetteloon`)
        console.log(`Henkilö '${personObject.name}' lisätty puhelinluetteloon`)
      })
      .catch(error => {
        notifyWith(`Virhe puhelinluetteloon lisäämisessä`, 'error')
        console.log('Virhe puhelinluetteloon lisäämisessä')
      })      
    }
    setNewName('')
    setNewNumber('')
  }

  //Metodi henkilön poistamiseksi
  const delPerson = id => {  
    if(window.confirm('Haluatko varmasti poistaa tämän henkilön puhelinluettelosta?')){
        personService
        .delPerson(id)
        .then(
            personService
            .getAll()
            .then(initialPersons => {
            setPersons(persons.filter(p => p.id !== id))
            notifyWith(`Henkilö poistettu puhelinluettelosta`)
        })
        .catch(error => {
          notifyWith(`Henkilö on jo poistettu luettelosta`, 'error')
        })
      )          
    }
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
    console.log("Haku: ",newSearch)
  }
  
  //Filtteröidään näytettävät nimet haun perusteella
  //<Notification message = {message} notifType = {notifType}/>
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />      
      <form>
        Filter shown with: 
        <input
          value={newSearch}
          onChange={handleSearch}
        />
      </form>
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handlePersonChange={handlePersonChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} delPerson = {delPerson}/>
    </div>
  )
}

export default  App