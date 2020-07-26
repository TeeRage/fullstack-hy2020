/**
* Loggeri, joka tarjoaa kaksi funktiota: normaalien logiviesteihin tarkoitetun funktion info sekä virhetilanteisiin tarkoitetun funktion error.
* Jos päätämme ruveta kirjoittamaan logeja tiedostoon tai keräämään ne johonkin ulkoiseen palveluun kuten graylog tai papertrail, on muutos helppo tehdä tänne.
*/

const info = (...params) => {
  console.log(...params)
}
  
const error = (...params) => {
  console.error(...params)
}
  
module.exports = {
  info, error
}