import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import 'react-calendar-heatmap/dist/styles.css'
import { Header, Grid, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import "react-datepicker/dist/react-datepicker.css";
import ReactTooltip from 'react-tooltip'

// if a list is completed that day, mark that day in calendar

class Calendar extends Component {

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

  render() {

    console.log(this.props.tasks_completed);

    return (
      <div>
        <Image src={'https://images.unsplash.com/photo-1541269676894-e7edc07ec4b1?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'} alt="#" id="calendar-img"/>
        <div className="calendar-circle-div">
            <Grid columns={2}  textAlign='center'>

              <Grid.Row verticalAlign='middle'>
                <Grid.Column id="calendar-lists">
                  <Header>
                    <p className="lists" id="calendar">total lists</p>
                    <h1 id="calendar" className="total">{this.props.currentUser.lists_completed}</h1>
                  </Header>
                </Grid.Column>

                <Grid.Column id="calendar-tasks">
                  <Header>
                    <p className="lists" id="calendar">total tasks</p>
                    <h1 className="total" id="calendar">{this.props.currentUser.tasks_completed}</h1>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        </div>

        <div className="calendar-div">
          <h1 id="streak">you're on a {this.totalListsDone()} day streak!</h1>
          <DatePicker
            inline
            onChange={this.handleChange}
            monthsShown={1}
            highlightDates={this.changeToMomentFormat()}
            onClick={ ("hi")}
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
