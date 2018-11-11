const initialState = {
  currentUser: {}, //This holds user_id and user email
  lists: [], //Hold an array of lists
  currentListID: 0,
  tasks: [],
  isListDone: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_USER":
      return {...state, currentUser: action.payload}
    case "SEND_LISTS":
      const sortedLists = action.payload.sort(function(a,b) {return b.id - a.id})
      return {...state, lists: sortedLists, currentListID: sortedLists[0].id}
    case "SET_LIST":
      const foundList = state.lists.find(list => list.id === action.payload)
      return {...state, currentListID: foundList.id, tasks: foundList.tasks}
    case "SEND_TASKS":
      const newLists = state.lists.map(list => {
        if(list.id === state.currentListID) {
          const newTasks = [...list.tasks, action.payload]
          return {...list, tasks: newTasks}
        } else {
          return list
        }
      })
      return {...state, lists: newLists}
    case "REMOVE_TASK":
      let filteredArr = state.tasks.filter(task => task.id !== parseInt(action.payload))
      const removedLists = state.lists.map(list => {
        if(list.id === state.currentListID) {
          const newTasks = list.tasks.filter(task => task.id !== parseInt(action.payload))
          return {...list, tasks: newTasks}
        } else {
          return list
        }
      })
      return {...state, tasks: filteredArr, lists: removedLists}
    case "EDIT_TASK":
      const edited_lists = state.lists.map((list)=> {
      	if(list.id === state.currentListID) {
          let x = list.tasks.map((task) => {
      	     if(task.id === action.payload) {
      	        return {...task, done: !task.done}
              } else {return task}
            })
            return {...list, tasks: x}
          } else {return list}
      })
      return {...state, lists: edited_lists}
    case "EDIT_LIST":
      const edited_list = state.lists.map((list)=> {
        if(list.id === action.payload.id) {
          return action.payload
        } else {return list}
      })
      return {...state, lists: edited_list}
    case "REMOVE_LIST":
      let arr = state.lists.filter(list => list.id !== parseInt(action.payload))
      return {...state, lists: arr, currentListID: arr[0].id}
    case "ADD_LIST":
      return {...state, lists: [action.payload, ...state.lists]}
    case "LIST_DONE":

      return {...state, isListDone: action.payload}
    default:
      return state
  }
}

export default reducer
