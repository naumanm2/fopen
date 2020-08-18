export const notification = (act, time) => {
  return async dispatch => {
    await setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: {
          act: act,
          display: { display: 'none' }
        }
      })
    }, time * 1000)

    dispatch({
      type: 'NOTIFICATION',
      data: {
        act: act,
        display: { display: '' }
      }
    })

  }
}


const initialState = {
  display: { display: 'none' }
}


const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      return action.data
    default:
      return state
  }

}

export default notificationReducer
