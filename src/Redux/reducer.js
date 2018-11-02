const initialState = {
  currentUser: {},
  lists: [],
  currentList: [],
  tasks: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_USER":
      return {...state, currentUser: action.payload}
    case "SEND_LISTS":
      return {...state, lists: action.payload}
    case "SEND_TASKS":
      return {...state, tasks: [action.payload, ...state.tasks]}
    case "REMOVE_TASK":
      const filteredArr = state.tasks.filter(task => task.id !== action.payload)
      return {...state, tasks: filteredArr}
    default:
      return state
  }
}

export default reducer
