import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries.js'

const App = () => {

  const [countries, setCountry] = useState([])
  const [ newSearch, setNewSearch ] = useState('')

  //Haetaan lista maista axioksella, asetetaan listaan countries useStatella
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data)
      })
  }, [])

  //Asetetaan uusi muuttuja hakua varten
  const handleSearch = (event) => {    
    setNewSearch(event.target.value)
    console.log("Haku: ", newSearch)
  }

  //Filtteröidään näytettävät maat haun perusteella
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <form>
        Etsi maa: <input
          value={newSearch}
          onChange={handleSearch}
        />
      </form>
      <Countries countriesToShow = {countriesToShow}/>
    </div>
  )
}

export default App;