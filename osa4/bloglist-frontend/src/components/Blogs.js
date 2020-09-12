import React from 'react'
import { connect } from 'react-redux'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'

import { Link } from 'react-router-dom'

const Blogs = ({
  blog,
  user,
  deleteBlog,
  voteBlog,
  visibleBlogs
  }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blog.map(blog =>
        <div key={blog.id}>
          <div style = {blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blog: state.blogs
  }
}

const mapDispatchToProps = {
  voteBlog,
  deleteBlog
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)
