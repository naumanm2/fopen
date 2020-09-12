import React from 'react'
import { connect } from 'react-redux'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'
import { toggleVisibility } from '../reducers/visibilityReducer'

const Blog = ({
  blog,
  user,
  deleteBlog,
  voteBlog,
  visibleBlogs,
  toggleVisibility
}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenValidUser = (blog) => {
      return { display: (blog.user.username === user.username) ? '' : 'none' }


  }

  if (!blog) {
    return (
      <div>loading...</div>
    )
  } else {
  return (
    <div style = {blogStyle}>
      {blog.title} {blog.author}
      <p>{blog.url}</p>
      <p>likes {blog.likes}<button onClick={() => {voteBlog(blog, user.token)}}>like</button></p>
      <p>{blog.user.username}</p>
      <div style = {showWhenValidUser(blog)} className="removebutton">
        <button onClick={() => { deleteBlog(blog, user.token)} }>remove</button>
      </div>
  </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    visibleBlogs: state.visibility
  }
}

const mapDispatchToProps = {
  voteBlog,
  deleteBlog,
  toggleVisibility
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
