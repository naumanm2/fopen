import React from 'react'

const Logout = ({user, handleLogout}) => {
  return (
    <div>
      <form onSubmit = {handleLogout}>
        <div>
          {user.username} logged in
          <button type="submit"> logout </button>
        </div>
      </form>
    </div>
  )
}

export default Logout
