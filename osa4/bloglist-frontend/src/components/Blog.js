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

  const check = blog => {
    return visibleBlogs.indexOf(blog.id) > -1
  }

  const setVisibility = (blog) => {
    if (check(blog)) {
      toggleVisibility(false, blog.id)
    } else {
      toggleVisibility(true, blog.id)
    }

  }

  const text = (blog) => {
    if (check(blog)) {
      return 'hide'
    }
      else {
        return 'view'
      }
  }


  const showWhenValidUser = (blog) => {
    return { display: (blog.user.username === user.username) ? '' : 'none' }
  }

  const showWhenValid = (blog) => {
    if (check(blog)) {
      return { display: '' }
    } else {
      return { display: 'none' }
    }

  }

  return (
    <div>
      {blog.map(blog =>
        <div key={blog.id}>
          <div style = {blogStyle}>
          <div className="showOnDefault">
            {blog.title} {blog.author} <button onClick={() => setVisibility(blog)}>{text(blog)}</button>
          </div>
          <div style = {showWhenValid(blog)} className="doNotShowOnDefault">
            <p>{blog.url}</p>
            <p>likes {blog.likes}<button onClick={() => {voteBlog(blog, user.token)}}>like</button></p>
            <p>{blog.user.username}</p>
            <div style = {showWhenValidUser(blog)} className="removebutton">
              <button onClick={() => { deleteBlog(blog, user.token)} }>remove</button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blog: state.blogs,
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
