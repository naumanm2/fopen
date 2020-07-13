import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('view')
  const showWhenVisible = {display: visible ? '' : 'none'}

  const setVisibility = () => {
    setVisible(!visible)
    if (text === 'view') {
      setText('hide')
    } else {
      setText('view')
    }
  }

  return (
  <div style = {blogStyle}>
    <div>
      {blog.title} {blog.author} <button onClick={setVisibility}>{text}</button>
    </div>
    <div style = {showWhenVisible}>
      <p>{blog.url}</p>
      <p>likes {blog.likes}<button>like</button></p>
      <p>{blog.user.username}</p>
    </div>

  </div>
  )
}

export default Blog
