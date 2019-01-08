import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import 'react-calendar-heatmap/dist/styles.css'
import {connect} from 'react-redux'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import "react-datepicker/dist/react-datepicker.css";
import ReactTooltip from 'react-tooltip'
import './CSS/calendar.scss'

// if a list is completed that day, mark that day in calendar

class Calendar extends Component {

  state = {
    isOpen: false
  }

  changeToMomentFormat() {
    if (this.props.lists) {
      return this.props.lists
        .filter(list => list.done)
        .map(list => moment(list.time_completed))
    }
  }

  totalListsDone() {
    if (this.props.lists) {
      return this.props.lists
        .filter(list => list.done)
        .length
    }
  }

  totalTasksDone() {
    return this.props.tasks
      .filter(task => task.done)
      .length
  }

  // handleChange (date) {
  //   this.setState({startDate: date})
  //   this.toggleCalendar()
  // }

  toggleCalendar = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {

    console.log(this.props.tasks_completed);

    return (
      <div>
        <div className="calendar-div">
          <div className="stats">
            <div id="cal-h1">
              <h1>lists completed: <p>{this.props.currentUser.lists_completed}</p></h1>
              <h1>tasks completed: <p>{this.props.currentUser.tasks_completed}</p></h1>
            </div>
          </div>
          <DatePicker
            onChange={this.handleChange}
            monthsShown={1}
            highlightDates={this.changeToMomentFormat()}
            onClick={ ("hi")}
            inline
          />
        </div>
        <ReactTooltip />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    lists: state.lists,
    doneList: state.isListDone,
    currentUser: state.currentUser,
    tasks_completed: state.tasks_completed,
    lists_completed: state.lists_completed
  }
}

export default connect(mapStateToProps)(Calendar)
