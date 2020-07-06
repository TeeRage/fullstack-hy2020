import React, { useState } from 'react'

const Person = ({person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040 123 456' }]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((nimi, i) =><Person key ={i} person={nimi}/>)}
    </div>
  )
}

export default App