import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserToShow } from '../reducers/userReducer'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'


const Users = ({users, setUserToShow}) => {

  return (
    <div>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
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

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  setUserToShow
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users)
