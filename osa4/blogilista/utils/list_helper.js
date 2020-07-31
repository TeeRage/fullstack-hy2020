/* eslint-disable no-unused-vars */
/**
 * Joukko blogilistan käsittelyyn tarkoitettuja apufunktioita
*/

//Lodash-kirjasto
var _ = require('lodash')

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
/**
 * Funktio, joka selvittää kirjoittajan, kenellä on eniten blogeja.
 * Palauttaa olion, joka sisältää kirjoittajan sekä blogien määrän.
 * 
 * @param {Array} blogs Taulukollinen blogeja
 */
const mostBlogs  = (blogs) => {

  //Lista kirjoittajista ja heidän blogiensa lukumääristä 
  //{ author: 'Edsger W. Dijkstra', blogs: 3 }, { author: 'Robert C. Martin', blogs: 2 }
  const authorsList = _.map(_.countBy(blogs, 'author'), (val, key) => ({ author: key, blogs: val }))

  //Hakee eniten blogeja kirjoittaneen kirjailijan ja blogien määrän
  //{ author: 'Edsger W. Dijkstra', blogs: 3 }
  const maxBlogs = _.maxBy(authorsList, function(o) { return o.blogs} )

  return maxBlogs
}

module.exports = {
  dummy, 
  totalLikes,
  favouriteBlog,
  mostBlogs
}