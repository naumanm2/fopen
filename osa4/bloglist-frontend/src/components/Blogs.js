import React from 'react'
import { connect } from 'react-redux'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'

import { NavLink } from 'react-router-dom'

const Blogs = ({
  blog,
  user,
  deleteBlog,
  voteBlog,
  visibleBlogs
  }) => {

  return (
    <div>
      {blog.map(blog =>
        <div key={blog.id}>
          <div>
            <NavLink
              to={`/blogs/${blog.id}`}
              style={{
                font: "Roboto",
                textDecoration: "none",
                color: "white"
              }}>{blog.title} {blog.author}
            </NavLink>
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
