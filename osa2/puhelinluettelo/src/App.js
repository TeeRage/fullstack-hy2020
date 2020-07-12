import React, { useState, useEffect } from 'react'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [message, setMessage] = useState(null)
  const [notifType, setNotifType] = useState('success')

  //Haetaan puhelinluettelo json-serveriltä portista 3001 (db.json sisältää tietokannan) käyttämällä personService-moduulia
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //Henkilön lisääminen puhelinluetteloon
  const addPerson = (event) => {

    event.preventDefault()

    setNotifType('success')

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
          setMessage(`Henkilön '${personObject.name}' puhelinnumero muutettu`)
          setTimeout(() => {
            setMessage(null)
          }, 2000) 
          console.log(`Henkilön '${personObject.name}' puhelinnumero muutettu`)
        })
        .catch(error => {
          setNotifType('error')
          setMessage(`Virhe puhelinluetteloon lisäämisessä`) 
            setTimeout(() => {
              setMessage(null)
            }, 2000)
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
        setMessage(`Henkilö '${personObject.name}' lisätty puhelinluetteloon`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
        console.log(`Henkilö '${personObject.name}' lisätty puhelinluetteloon`)
      })
      .catch(error => {
        setNotifType('error')
        setMessage(`Virhe puhelinluetteloon lisäämisessä`) 
            setTimeout(() => {
              setMessage(null)
            }, 2000)
        console.log('Virhe puhelinluetteloon lisäämisessä')
      })      
    }
    setNewName('')
    setNewNumber('')
  }

  //Metodi henkilön poistamiseksi
  const delPerson = id => {

    setNotifType('success')
  
    if(window.confirm('Haluatko varmasti poistaa tämän henkilön puhelinluettelosta?')){
        personService
        .delPerson(id)
        .then(
            personService
            .getAll()
            .then(initialPersons => {
            setPersons(initialPersons)
          
            setMessage(`Henkilö poistettu puhelinluettelosta`)    
            setTimeout(() => {
              setMessage(null)
            }, 2000)
        })
        .catch(error => {
          setNotifType('error')
          setMessage(`Virhe, poistaminen ei onnistunut`)    
            setTimeout(() => {
              setMessage(null)
            }, 2000)
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
    console.log(newSearch)
  }
  
  //Filtteröidään näytettävät nimet haun perusteella
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>      
      <Notification message = {message} notifType = {notifType}/>
      <form>
        Filter shown with: 
        <input
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