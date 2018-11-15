import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import 'react-calendar-heatmap/dist/styles.css'

import {connect} from 'react-redux'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import "react-datepicker/dist/react-datepicker.css";


// if a list is completed that day, mark that day in calendar

class Calendar extends Component {
  changeToMomentFormat() {
    return this.props.lists
      .filter(list => list.done)
      .map(list => moment(list.time_completed))
  }

  render() {

    return (
      <div>
        {console.log(moment(), 'dates')}

        {console.log(this.props.lists
          .filter(list => list.done)
          .map(list => moment(list.time_completed)), 'done dates')}
        <DatePicker
            inline
            onChange={this.handleChange}
            monthsShown={1}
            highlightDates={this.changeToMomentFormat()}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentList: state.lists.find(list => list.id === state.currentListID),
    lists: state.lists,
    doneList: state.isListDone,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Calendar)
