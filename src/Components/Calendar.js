import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import 'react-calendar-heatmap/dist/styles.css'
import { Header, Grid, Segment, Divider, Search, Button, Icon } from 'semantic-ui-react'
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

  totalListsDone() {
    return this.props.lists
      .filter(list => list.done)
      .length
  }

  totalTasksDone() {
      return this.props.tasks
        .filter(task => task.done)
        .length
    }

  render() {
    if (this.props.tasks.length > 0) {
    console.log(this.props.tasks);
  }

    return (
      <div>
        <div className="calendar-circle-div">
          <Segment placeholder>
            <Grid columns={2}  textAlign='center'>
              <Divider vertical><Icon name="check circle outline" className="icon" size="huge" /></Divider>

              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                  <Header>
                    <p className="lists">total lists</p>
                    <h1 className="total">{this.totalListsDone()}</h1>
                  </Header>
                </Grid.Column>

                <Grid.Column>
                  <Header>
                    <p className="lists">total tasks</p>
                    <h1 className="total">{this.totalTasksDone()}</h1>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>

        <div className="calendar-div">
          <DatePicker
            inline
            onChange={this.handleChange}
            monthsShown={1}
            highlightDates={this.changeToMomentFormat()}
          />
        </div>
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
