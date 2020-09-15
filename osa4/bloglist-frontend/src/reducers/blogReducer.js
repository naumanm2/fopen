import blogService from '../services/blogs'


const sortblogs = (a, b) => {
  return b.likes - a.likes
}

export const addBlog = (blog, user) => {
  return async dispatch => {
    const addBlog = ({
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
    await blogService.setToken(user.token)
    const data = await blogService.createBlog(addBlog)
      dispatch({
        type: 'ADD_BLOG',
        data
      })
  }
}

export const postComment = (comment, blog, user) => {
  return async dispatch => {
    await blogService.setToken(user.token)
    const content = await blogService.comment({ comment }, blog.id)
    console.log(content)
    const updatedBlog = {...blog, comments: blog.comments.concat(comment)}
      dispatch({
        type: 'COMMENT',
        data: {
          content: content,
          data: updatedBlog
        }
      })
  }
}


export const voteBlog = (blog, token) => {
  return async dispatch => {
    await blogService.setToken(token)
    const toVote = ({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })

    const data = await blogService.update(toVote, blog.id)
    dispatch({
      type: 'VOTE_BLOG',
      data
    })
  }
}

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll().then(blogs => blogs.sort(sortblogs))
    dispatch({
      type: 'INITIAL_BLOGS',
      blogs
    })
  }
}

export const deleteBlog = (blog, token) => {
  return async dispatch => {
    await blogService.setToken(token)
    await blogService.deleteblog(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      blog
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'INITIAL_BLOGS':
      return action.blogs
    case 'DELETE_BLOG':
      return state.filter(x => x.id !== action.blog.id)
    case 'VOTE_BLOG':
      return state
      .map(x => x.id !== action.data.id ? x : action.data)
      .sort(sortblogs)
    case 'COMMENT':
      return state
        .map(x => x.id !== action.data.id ? x : action.data)
    default:
      return state
  }
}

export default blogReducer
