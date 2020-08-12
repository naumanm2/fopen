export const toggleVisibility = (toggle) => {
  return {
    type: toggle,
    data: {
      display: 'none'
    }
  }
}

const visibilityReducer = (state = 'none', action) => {
  switch(action.type) {
    case 'SHOW':
      return {
        display: ''
      }
    default:
      return {
        display: 'none'
      }
  }
}

export default visibilityReducer
