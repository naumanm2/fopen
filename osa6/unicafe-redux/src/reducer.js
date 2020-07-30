const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case 'GOOD':
      initialState.good += 1
      return state = initialState
    case 'OK':
    initialState.ok += 1
      return state = initialState
    case 'BAD':
      initialState.bad += 1
      return state = initialState
    case 'ZERO':
      initialState.good = 0
      initialState.ok = 0
      initialState.bad = 0
      return state = initialState
    default: return state
  }

}

export default counterReducer
