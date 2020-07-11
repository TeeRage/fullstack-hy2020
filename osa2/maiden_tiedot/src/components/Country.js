import React from 'react'

//Haun tuloksena vain yksi maa, näytetään maan tarkemmat tiedot
const Country = ({country}) => {
  
  console.log("Maan tiedot: ",{country})
  console.log("Kielet", country.languages)

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Pääkaupunki: {country.capital}</p>
      <p>Asukasluku: {country.population}</p>
      <h3>Puhutut kielet</h3>
      <ul>        
        {country.languages.map((kieli, i) => <li key = {i}> {kieli.name}</li>)}
      </ul>               
      <div>
        <img src={country.flag} alt="new" height={100} mode='fit'/>
      </div>
    </div>
  )
}

export default Country