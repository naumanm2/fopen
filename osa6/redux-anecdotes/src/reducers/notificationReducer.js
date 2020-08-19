export const notification = (act, time, timer) => {

  return async dispatch => {

    await clearTimeout(timer)

    timer = await setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: {
          act: act,
          display: { display: 'none' },
          timer: timer
        }
      })
    }, time * 1000)
    
    dispatch({
      type: 'NOTIFICATION',
      data: {
        act: act,
        display: { display: '' },
        timer: timer
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
