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

/**
 * Funktio, joka selvittää millä blogilla on eniten tykkäyksiä
 * Jos suosikkeja on monta, funktio palauttaa niistä jonkun.
 * Saa syötteenä arrayn, joka sisältää blogeja.
 * 
 * @param {Array} blogs Taulukollinen blogeja
 */
const favouriteBlog = (blogs) => {

  //Etsi suurin likes arvo blogeista
  const maxLikes = Math.max.apply(Math, blogs.map(function(blog) { return blog.likes }))

  //Etsi, mikä blogi täsmää löydettyyn tykkäysten määrään
  const fav = blogs.find(b => b.likes === maxLikes)

  //Luodaan ja palautetaan olio, jolla on suosikkiblogin tiedot
  const favBlog = {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }

  return favBlog
}

module.exports = {
  dummy, 
  totalLikes,
  favouriteBlog
}