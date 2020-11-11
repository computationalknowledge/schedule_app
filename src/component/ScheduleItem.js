import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import moment from "moment";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-elements';
import * as Constants from '../constants'
import styles from '../StyleSheet'

class ScheduleItem extends Component {

  renderStatusStyle = (status) => {
    if (status == Constants.SCHEDULE_NEW) {
      return styles.mainColor
    } else if (status == Constants.SCHEDULE_WAITING_ACCEPT) {
      return styles.infoColor
    } else if (status == Constants.SCHEDULE_CONFIRMED) {
      return styles.acceptedColor
    } else if (status == Constants.SCHEDULE_ACTION_REQUIRED) {
      return styles.refusedColor
    } else {
      return styles.canceledColor
    }
  }

  renderStatusText = (status) => {
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

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={[styles.sideInfo, this.renderStatusStyle(this.props.schedule.status)]}></View>
          <View style={styles.itemRow}>
            <View style={styles.row}>
              <Text style={styles.schoolName}>{this.props.schedule.daycareName}</Text>
              <Text style={styles.creationDate}>{moment(this.props.schedule.creationDate).format('MMM DD, YYYY')}</Text>
            </View>
            <Divider style={styles.separator} />
            <View style={styles.dateRow}>
              <View style={styles.row}>
                <Icon style={styles.icon} name='calendar-import' size={20} />
                <Text style={styles.text}>{moment(this.props.schedule.startDate).format('dddd, MMMM DD, YYYY')}</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='clock-start' size={20} />
                <Text style={styles.text}>{this.props.schedule.startTime}</Text>
              </View>
            </View>
            <View style={styles.dateRow}>
              <View style={styles.row}>
                <Icon style={styles.icon} name='calendar-export' size={20} />
                <Text style={styles.text}>{moment(this.props.schedule.endDate).format('dddd, MMMM DD, YYYY')}</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='clock-end' size={20} />
                <Text style={styles.text}>{this.props.schedule.endTime}</Text>
              </View>
            </View>
            <View style={styles.dateRow}>
              <View style={styles.row}>
                <Text>{this.renderStatusText(this.props.schedule.status)}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default ScheduleItem