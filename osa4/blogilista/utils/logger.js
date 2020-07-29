/**
* Loggeri, joka tarjoaa kaksi funktiota: normaalien logiviesteihin tarkoitetun funktion info sekä virhetilanteisiin tarkoitetun funktion error.
* Jos päätämme ruveta kirjoittamaan logeja tiedostoon tai keräämään ne johonkin ulkoiseen palveluun kuten graylog tai papertrail, on muutos helppo tehdä tänne.
* Ei tulosteta logitiedostoja konsoliin, jos sovellus käynnistetään testausmodissa.
*/

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}
  
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.error(...params)
  }
}
  
module.exports = {
  info, error
}