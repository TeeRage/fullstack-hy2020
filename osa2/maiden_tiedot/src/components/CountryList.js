import React from 'react'

//Haun tuloksena useita maita, näytetään maiden nimet listana
const CountryList = ({country, setSearch}) => {
    return (
      <p>{country.name} <button onClick ={() => setSearch(country.name)}>Näytä maan tiedot</button></p>
    )
}

export default CountryList