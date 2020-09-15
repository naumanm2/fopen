import React from 'react'
import { connect } from 'react-redux'
import { voteBlog, deleteBlog, postComment } from '../reducers/blogReducer'
import { toggleVisibility } from '../reducers/visibilityReducer'

const Blog = ({
  blog,
  user,
  deleteBlog,
  voteBlog,
  visibleBlogs,
  toggleVisibility,
  comment,
  handleChange,
  postComment
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
    <div>
      <div>
        <div style = {blogStyle}>
          {blog.title} {blog.author}
          <p>{blog.url}</p>
          <p>likes {blog.likes}<button onClick={() => {voteBlog(blog, user.token)}}>like</button></p>
          <p>{blog.user.username}</p>
          <div style = {showWhenValidUser(blog)} className="removebutton">
            <button onClick={() => { deleteBlog(blog, user.token)} }>remove</button>
          </div>
      </div>
    </div>
    <div id="comments">
      <form onSubmit = {() => postComment(comment, blog, user)}>
        <input type="text" value={comment} onChange={handleChange}></input>
        <button>comment</button>
      </form>
      <ul>
        {blog.comments.map(c =>
          <li key={c}>{c}</li>
        )}
      </ul>
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
  toggleVisibility,
  postComment
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
