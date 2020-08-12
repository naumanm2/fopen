export const filter = (key) => {
  return {
    type: 'FILTER',
    filter: key
  }

}

const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.filter
    default:
      return ''
  }
}

export default filterReducer
