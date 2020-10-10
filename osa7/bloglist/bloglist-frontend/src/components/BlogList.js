/**
 * Lista tietokannan blogeista.
 * Blogia voi klikata, jolloin siirrytään kyseisen blogin tiedot näyttävälle sivulle.
 */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import NewBlog from './NewBlog'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core'

const BlogList = () => {

  //Näytettävät blogit
  const blogs = useSelector(state => {
    return state.blogs
  })

  //Togglablelle ref tiedot
  const blogFormRef = React.createRef()

  return (
    <div>
      <Togglable buttonLabel='Lisää uusi blogi'  ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <h2>Blogit</h2>
      <TableContainer component={ Paper }>
        <Table>
          <TableBody>
            {blogs.map(blogi => (
              <TableRow key={blogi.id}>
                <TableCell>
                  <Link to={`/blogs/${blogi.id}`}>{blogi.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList