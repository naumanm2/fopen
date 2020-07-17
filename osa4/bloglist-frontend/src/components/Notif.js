import React from 'react'

const Notif = ({ msg, success }) => {
  if (msg === null) {
    return null
  }
  if (success) {
    return (
      <div className='success'>
        {msg}
      </div>
    )
  } else {
    return (
      <div className='error'>
        {msg}
      </div>
    )
  }

}

export default Notif
