/**
 * Näkymä, jossa näytetään lista käyttäjistä ja lukumäärä, montako blogia kyseinen käytätjä on luonut.
 * Nimeä klikkaamalla pystyy siirtymään näkymään, jolta selviää mm. käyttäjän lisäämät blogit
 */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core'

const UsersForm = ({ allUsers }) => {
  return (
    <div>
      <h2>Käyttäjät</h2>
      <TableContainer component={ Paper }>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nimi</TableCell>
              <TableCell>Lisättyjä blogeja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default connect (
  (state) => ({ allUsers: state.users })
) (UsersForm)