const initialState = {
  currentUser: {}, //This holds user_id and user email
  lists: [], //Hold an array of lists
  currentList: {},
  tasks: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_USER":
      return {...state, currentUser: action.payload}
    case "SEND_LISTS":
      return {...state, lists: action.payload}
    case "SET_LIST":
      const foundList = state.lists.find(list => list.id === action.payload)
      return {...state, currentList: foundList, tasks: foundList.tasks}
    case "SEND_TASKS":
      return {...state, tasks: [action.payload, ...state.tasks]}
    case "REMOVE_TASK":
      let filteredArr = state.tasks.filter(task => task.id !== parseInt(action.payload))
      return {...state, tasks: filteredArr}
    default:
      return state
  }
}

export default reducer
