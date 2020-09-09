export const toggleVisibility = (on, data) => {
    return async dispatch => {
        if (on) {
        dispatch({
        type: 'TOGGLE_VISIBILITY_ON',
        data
      })
  } else {
        dispatch({
        type: 'TOGGLE_VISIBILITY_OFF',
        data
      })
    }

  }

}


const visibilityReducer = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_VISIBILITY_ON':
     return [...state, action.data]
    case 'TOGGLE_VISIBILITY_OFF':
      return state.filter(x => x !== action.data)
    default:
      return state
  }
}

export default visibilityReducer
