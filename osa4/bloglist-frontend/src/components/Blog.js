import React, { useState } from 'react'

const Blog = ({
  userid,
  blog,
  setlikes,
  deleteblog
}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('view')
  const showWhenVisible = { display: visible ? '' : 'none' }

  const setVisibility = () => {
    setVisible(!visible)
    if (text === 'view') {
      setText('hide')
    } else {
      setText('view')
    }
  }

  const showWhenValidUser = (bloguserid) => {
    return { display: (bloguserid === userid) ? '' : 'none' }
  }

  return (
    <div style = {blogStyle}>
      <div className="showOnDefault">
        {blog.title} {blog.author} <button onClick={setVisibility}>{text}</button>
      </div>
      <div style = {showWhenVisible} className="doNotShowOnDefault">
        <p>{blog.url}</p>
        <p>likes {blog.likes}<button onClick={() => {setlikes(blog)}}>like</button></p>
        <p>{blog.user.username}</p>
        <div style = {showWhenValidUser(blog.user.username)} class="removebutton">
          <button onClick={() => { deleteblog(blog)} }>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
