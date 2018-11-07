const initialState = {
  currentUser: {}, //This holds user_id and user email
  lists: [], //Hold an array of lists
  currentListID: 0,
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
      return {...state, currentListID: foundList.id, tasks: foundList.tasks}

    case "SEND_TASKS":
      // const foundList = {...state.lists.find(list => list.id === state.currentListID)}
      // let newTasks = [...foundList.tasks, action.payload]
      // console.log('in send task', state.currentListID, action.payload)
      // return {...state, currentListID: {...state.currentListID, tasks: newTasks}}

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
    console.log(state)
      const edited_tasks = state.tasks.map(task => {
        if (task.id === action.payload) {
          return {...task, done: !task.done }
        }
        else {
          return task
        }
      })
      return {...state, tasks: edited_tasks}

    case "REMOVE_LIST":
      let arr = state.lists.filter(list => list.id !== parseInt(action.payload))
      return {...state, lists: arr}

    case "ADD_LIST":
      return {...state, lists: [action.payload, ...state.lists]}
    default:
      return state
  }
}

export default reducer
