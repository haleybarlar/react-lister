import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import 'react-calendar-heatmap/dist/styles.css'
import { Header, Grid, Segment, Divider, Icon } from 'semantic-ui-react'
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
        <div className="calendar-circle-div">
          <Segment placeholder>
            <Grid columns={2}  textAlign='center'>
              <Divider vertical><Icon name="check circle outline" className="icon" size="huge" /></Divider>

              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                  <Header>
                    <p className="lists" id="calendar">total lists</p>
                    <h1 id="calendar" className="total">{this.props.currentUser.lists_completed}</h1>
                  </Header>
                </Grid.Column>

                <Grid.Column>
                  <Header>
                    <p className="lists" id="calendar">total tasks</p>
                    <h1 className="total" id="calendar">{this.props.currentUser.tasks_completed}</h1>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
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
