import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={notification.display}>
      <div style={style}>
        {notification.act}
      </div>
    </div>

  )
}

export default connect(
  (state) => ({ notification: state.notification})
)(Notification)
