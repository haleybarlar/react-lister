import React, { Component } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'
import {connect} from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'


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
        <h1>Hi, {this.props.currentUser.email}</h1>

        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <h1>Your streak: 0 days</h1>
            </Grid.Column>
            <Grid.Column>
              {(this.props.currentUser.lists_completed === 1) ? <h1>You've completed {this.props.currentUser.lists_completed} list</h1> : <h1>You've completed {this.props.currentUser.lists_completed} lists</h1>}
            </Grid.Column>
            <Grid.Column>
              {(this.props.currentUser.tasks_completed === 1) ? <h1>You've completed {this.props.currentUser.tasks_completed} task</h1> : <h1>You've completed {this.props.currentUser.tasks_completed} tasks</h1>}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <CalendarHeatmap
          legend={true}
          startDate={this.shiftDate(today, -150)}
          endDate={today}
          values={values}
          tooltipDataAttrs={(value) => {
            if (value.date === null) {
              return {
                'data-tip': "You didnt finish today! :("
              }
            } else {
            return {
              'data-tip': "Atta boy!",
            };
          }}}
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
    doneList: state.isListDone,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Calendar)
