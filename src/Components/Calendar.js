import React, { Component } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'
import {connect} from 'react-redux'


// if a list is completed that day, mark that day in calendar

class Calendar extends Component {


  shiftDate = (date, numDays) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + numDays)
    return newDate
  }

  render() {
    const today = new Date()
    const done = this.props.lists.filter(list => list.done === true)

    const values = done.map(list => ({
      date: list.time_completed,
      count: list.done
    }))

    return (
      <div>
        <CalendarHeatmap
          startDate={this.shiftDate(today, -150)}
          endDate={today}
          values={values}
          tooltipDataAttrs={value => {
            return {
              'data-tip': `${value.date} was done:
              ${value.count}`,
            };
          }}
          showWeekdayLabels={true}
        />
        <ReactTooltip />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentList: state.lists.find(list => list.id === state.currentListID),
    lists: state.lists,
    doneList: state.isListDone
  }
}

export default connect(mapStateToProps)(Calendar)
