import React from 'react'
import { connect } from 'react-redux'

const Notif = ({ notification }) => {

  if (!notification) {
    return null
  }

  if (notification.success) {
    return (
      <div className='success'>
        {notification.msg}
      </div>
    )
  } else {
    return (
      <div className='error'>
        {notification.msg}
      </div>
    )
  }

}

export default connect(
  (state) => ({ notification: state.notification})
)(Notif)
