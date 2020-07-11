import React from 'react'
import Country from './Country.js'
import CountryList from './CountryList.js'

//Näytettävät maat/maa haun perusteella
const Countries = (props) => {

    if(props.countriesToShow.length > 1 && props.countriesToShow.length <= 10){
        return (
            props.countriesToShow.map((nimi, i) => <CountryList key ={i} country={nimi} setSearch={props.setSearch}/>)
        )
    }
    else if(props.countriesToShow.length === 0){
        return(
            <p>Annetulla hakusanalla ei löytynyt yhtään maata</p>
        )
    }
    else if(props.countriesToShow.length === 1){
        return(
            props.countriesToShow.map((nimi, i) => <Country key ={i} country={nimi}/>)
        )
    }

    else{
        return(
            <p>Liian monta hakutulosta, tarkenna hakua</p>
        )
    }
}

export default Countries