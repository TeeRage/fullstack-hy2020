/* eslint-disable no-unused-vars */
/**
 * Joukko blogilistan käsittelyyn tarkoitettuja apufunktioita
*/

/**
 * Apufunktioiden toiminnan testaus, palauttaa aina luvun 1
 * 
 * @param {Array} blogs Taulukollinen blogeja
 */
const dummy = (blogs) => {
  return 1
}

/**
 * Blogien yhteenlaskettu tykkäysten (likes) määrä.
 * Saa syötteenä arrayn, joka sisältää blogeja. 
 * 
 * @param {Array} blogs Taulukollinen blogeja
 */
const totalLikes = (blogs) => {

  //Jos syötteenä on tyhjä lista, palautetaan 0
  if (blogs.length === 0){
    return 0
  }

  //Luodaan uusi array, jossa jokaisen blogin likes-lukumäärä
  const tykkaykset = blogs.map(function(blogi){
    return blogi.likes
  })

  //Lasketaan yhteenlaskettu määrä reducerin avulla
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const summa = tykkaykset.reduce(reducer)

  return summa
}

module.exports = {
  dummy, 
  totalLikes
}