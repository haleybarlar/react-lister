import React, { Component } from 'react'
import List from './List.js'
import {connect} from 'react-redux'
import { Pagination, Menu } from 'semantic-ui-react'

class ListContainer extends Component {

  state = {
    activePage: 1
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage })
  }

render() {

  if (this.props.lists.length === 0) {
    console.log("whatever")
  } else {
    const list = this.props.lists.find(list => list.id === this.state.activePage)
    this.props.setCurrentList(list.id)
  }

  const { activePage } = this.state

  return(

    <div>
      <List />
      <Pagination
      activePage={this.state.activePage}
      onPageChange={this.handlePaginationChange}
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
    lists: state.lists,
    currentList: state.lists.find(list => list.id === state.currentListID)
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
