import React, { Component } from 'react'
import List from './List.js'
import {connect} from 'react-redux'
import { Pagination } from 'semantic-ui-react'

class ListContainer extends Component {

render() {
  const lists = this.props.lists.map(list => <List list={list} />)
  return(
    <div>
      {lists}
      <Pagination
      defaultActivePage={1}
      firstItem={null}
      lastItem={null}
      pointing
      secondary
      totalPages={this.props.lists.length}
      />
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    lists: state.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLists: (users) => {
      dispatch({
        type: "SEND_LISTS",
        payload: users
      })
    },
    setCurrentList: (id) => {
      dispatch({
        type: "SET_LIST",
        payload: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
