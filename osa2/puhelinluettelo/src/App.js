import React, { useState } from 'react'

const Person = ({person }) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [ newName, setNewName ] = useState('moi')

  //Lisätään henkilö persons-listaan
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName
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
  }

  //Asetetaan uusi nimi newName muuttujalle
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((nimi, i) =><Person key ={i} person={nimi}/>)}
    </div>
  )
}

export default App