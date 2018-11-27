const initialState = {
  currentUser: null, //This holds user_id and user email
  userLoggedIn: false,
  lists: [], //Hold an array of lists
  currentList: {},
  tasks: [],
  isListDone: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_USER":
      return {...state, userLoggedIn: true, currentUser: action.payload, lists: action.payload.lists}
    case "LOG_OUT":
      return {...state, userLoggedIn: false, currentUser: null}
    case "SEND_LISTS":
      if (action.payload) {
        const sortedLists = action.payload.sort(function(a,b) {return b.id - a.id})
        return {...state, lists: sortedLists, currentList: sortedLists[0]}
      } else {
        return {...state}
      }
    case "SET_LIST":
      if (state.lists) {
        let foundList = state.lists.find(list => list.id === action.payload)
          if (foundList) {
            return {...state, currentList: foundList, tasks: foundList.tasks}
          } else {
            console.log("it didn't work", action.payload);
            return {...state, currentList: state.lists[0]}
          }
      } else {
        return {...state}
      }
    case "SEND_TASKS":
      const newTasks = [...state.tasks, action.payload]
      return {...state, tasks: newTasks}
    case "REMOVE_TASK":
      let filteredArr = state.tasks.filter(task => task.id !== parseInt(action.payload))
      const removedLists = state.lists.map(list => {
        if(list.id === state.currentList.id) {
          const newTasks = list.tasks.filter(task => task.id !== parseInt(action.payload))
          return {...list, tasks: newTasks}
        } else {
          return list
        }
      })
      return {...state, tasks: filteredArr, lists: removedLists}
    case "EDIT_TASK":
      const edited_tasks = state.tasks.map(task => {
        if (task.id === action.payload) {
          return {...task, done: !task.done}
        } else {return task}
      })
      return {...state, tasks: edited_tasks}

      // const edited_lists = state.lists.map((list)=> {
      // 	if(list.id === state.currentList.id) {
      //     let x = list.tasks.map((task) => {
      // 	     if(task.id === action.payload) {
      // 	        return {...task, done: !task.done}
      //         } else {return task}
      //       })
      //       return {...list, tasks: x}
      //     } else {return list}
      // })
      // return {...state, lists: edited_lists}

    case "EDIT_LIST":
      const edited_list = state.lists.map((list)=> {
        if(list.id === action.payload.id) {
          return action.payload
        } else {return list}
      })
      return {...state, lists: edited_list}
    case "REMOVE_LIST":
      let arr = state.lists.filter(list => list.id !== parseInt(action.payload))
      return {...state, lists: arr, currentList: arr[0]}
    case "ADD_LIST":
      if (state.lists) {
        return {...state, lists: [action.payload, ...state.lists]}
      } else {
        return {...state, lists: [action.payload]}
      }
    case "LIST_DONE":
      return {...state, isListDone: action.payload}
    default:
      return state
  }
}

export default reducer
