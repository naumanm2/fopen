import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Logout = ({ user, logout }) => {
  return (
    <div>
      <form onSubmit = {logout}>
        <div>
          {user.username} logged in
          <button type="submit"> logout </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


const mapDispatchToProps = {
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout)
