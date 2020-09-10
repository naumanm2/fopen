import usersService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
  }

  export const setUserToShow = (user) => {
    return async dispatch => {
      dispatch({
        type: 'SINGLE_USER',
        user
      })
    }
  }



  const usersReducer = (state = [], action) => {
    switch (action.type) {
      case 'INIT_USERS':
        return action.data
      default:
        return state
    }
  }


export default usersReducer
