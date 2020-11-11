import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Agenda } from 'react-native-calendars'
import moment from "moment";
import * as Constants from '../constants'
import style from '../StyleSheet'
const testIDs = require('../testIDs')

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {}
    }
  }

  fetchSchedules = (day) => {
    setTimeout(() => {
          const newItems = {}
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            newItems[strTime] = [];
          }

          this.props.schedules.forEach((item) => {
            let diffDays = moment(item.endDate).diff(moment(item.startDate), 'days')
            for (let i = 0; i <= diffDays; i++) {
              let nextDay = moment(item.startDate).add(i, 'day')

              if (nextDay.isoWeekday() < 6) {
                let next = newItems[nextDay.format('YYYY-MM-DD')]
                let newObj = {
                  startTime: item.startTime,
                  endTime: item.endTime,
                  daycareName: item.daycareName,
                  id: item._id,
                  status: item.status,
                  scheduleId: item.scheduleId,
                  schoolId: item.schoolId,
                  quantity: item.quantity
                }

                if (next != undefined && next.length == 0) {
                  newItems[nextDay.format('YYYY-MM-DD')] = [newObj]
                } else if (next != undefined && next.length > 0) {
                  newItems[nextDay.format('YYYY-MM-DD')].push(newObj)
                }
              }
            }
          })
          this.setState({ items: newItems });
    }, 500);
  }

  getCurrentDate = () => {
    var today = new Date();
    return today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate();
  }

  getCompanyScheduleStatus = (status) => {
    if (status == Constants.SCHEDULE_NEW) {
      return "New"
    } else if (status == Constants.SCHEDULE_WAITING_ACCEPT) {
      return "Awaiting acceptance"
    } else if (status == Constants.SCHEDULE_CONFIRMED) {
      return "Confirmed"
    } else if (status == Constants.SCHEDULE_ACTION_REQUIRED) {
      return "Action Required"
    } else {
      return "Canceled"
    }
  }

  renderCompanyStatusStyle = (status) => {
    if (status == Constants.SCHEDULE_NEW) {
      return style.mainColor
    } else if (status == Constants.SCHEDULE_WAITING_ACCEPT) {
      return style.infoColor
    } else if (status == Constants.SCHEDULE_CONFIRMED) {
      return style.acceptedColor
    } else if (status == Constants.SCHEDULE_ACTION_REQUIRED) {
      return style.refusedColor
    } else {
      return style.canceledColor
    }
  }

  render() {
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.fetchSchedules.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{
          agendaKnobColor: Constants.AppMainColor,
          selectedDayBackgroundColor: Constants.AppMainColor,
          agendaTodayColor: Constants.AppMainColor,
          monthTextColor: Constants.AppMainColor
        }}
      />
    )
  }

  loadItems(day) {
    setTimeout(() => {
      const newItems = {}
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        newItems[strTime] = [];
      }

      for (let item of this.state.schedules) {
        newItems[item.date] = [item]
      }

      this.setState({ items: newItems });
    }, 500);
  }

  renderItem(item) {
      return (
        <TouchableOpacity
          testID={testIDs.agenda.ITEM}
          style={[styles.item, this.renderCompanyStatusStyle(item.status)]}>
          <Text style={styles.agendaSchool}>{item.daycareName}</Text>
          <Text style={styles.agendaTime}>{item.startTime}  -  {item.endTime}</Text>
          <Text style={styles.agendaTime}>{this.getCompanyScheduleStatus(item.status)}</Text>
        </TouchableOpacity>
      )
  }

  renderEmptyDate() {
    return null
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    //backgroundColor: 'rgba(255,0,0,0.2)', //for style change
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    paddingLeft: 10,
    padding: 5,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  agendaTime: {
    color: 'white',
    //color: '#EC4C4C', //for style change
    //fontWeight: '300'
  },
  agendaSchool: {
    color: 'white'
  }
});

const mapStateToProps = (props) => {
  return {
    schedules: props.schedules.schedules,
    user: props.user.user
  }
}

export default connect(mapStateToProps)(Schedule)