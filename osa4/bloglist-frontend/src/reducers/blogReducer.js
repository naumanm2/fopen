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
    const data = await blogService.deleteblog(blog.id)

    dispatch({
      type: 'DELETE_BLOG',
      data
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
      console.log(state)
      console.log(action.data)
      return state.filter(x => x.id !== action.data.id)
    case 'VOTE_BLOG':
    console.log(state)
      return state
      .map(x => x.id !== action.data.id ? x : action.data)
      .sort(sortblogs)
      default:
      return state
  }
}

export default blogReducer
