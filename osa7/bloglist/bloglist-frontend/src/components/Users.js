/**
 * Näkymä, jossa näytetään lista käyttäjistä ja lukumäärä, montako blogia kyseinen käytätjä on luonut.
 * Nimeä klikkaamalla pystyy siirtymään näkymään, jolta selviää mm. käyttäjän lisäämät blogit
 */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersForm = ({ allUsers }) => {

  return (
    <div>
      <h2>Users</h2>
      {allUsers.map(u =>
        <div key={u.id}>
          <div>
            <Link to={`/users/${u.id}`}>
              {u.name}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default connect (
  (state) => ({ allUsers: state.users })
) (UsersForm)