import React from 'react'

//Haun tuloksena useita maita, näytetään maiden nimet listana
const CountryList = ({country}) => {
    return (
      <p>{country.name}</p>
    )
}

export default CountryList