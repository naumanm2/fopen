import blogService from '../services/blogs'

export const initComments = (id) => {
  return async dispatch => {
    const blog = await blogService.getAll().find(x => x.id === id).comments
    dispatch({
      type: 'INIT_COMMENTS',
      data: blog
    })
  }
}

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS':
      return action.data
    case 'COMMENT':
      return action.data
    default:
      return state
  }
}

export default commentReducer
