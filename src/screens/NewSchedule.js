import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Picker, Alert } from 'react-native'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import ModalStackCalendar from "..//component/ModalStackCalendar"
import Icon from 'react-native-vector-icons/FontAwesome'
import { ColoredRaisedButton } from 'react-native-material-kit';
import * as Constants from '../constants'
import { addSchedule } from '../store/actions/schedule'

class NewSchedule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD'),
      startTime: "8:00 AM",
      endTime: "5:00 PM",
      firstSelected: false,
      pickerVisible: false,
      selectedValue: '',
      selectedQuantity: 1,
      pickerItems: []
    }
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({ title: "New Schedule" })
    this.getDaycares()
  }

  getDaycares = () => {
    const items = []
    var i = 0
    items.push(<Picker.Item label="" value="" key={0} />)
    this.props.daycares.forEach((item) => {
      items.push(<Picker.Item label={item.name} value={item} key={i} />)
      i += 1
    })
    this.setState({ pickerItems: items });
  }

  openPicker = (firstSelected) => {
    this.setState({ firstSelected })
    this.setState({ pickerVisible: !this.state.pickerVisible })
  }

  changePickerValue = (date) => {
    if (this.state.firstSelected) {
      this.setState({ startTime: moment(date).format('h:mm A') })
    } else {
      this.setState({ endTime: moment(date).format('h:mm A') })
    }
    this.setState({ pickerVisible: !this.state.pickerVisible })
  }

  changeFromValue = (date) => {
    this.setState({ startDate: date })
  }

  changeToValue = (date) => {
    this.setState({ endDate: date })
  }

  save = () => {
    if (this.props.user.schoolId != null || this.state.selectedValue.id != null) {
      let newSchedule = {
        creationDate: moment(new Date()).format('YYYY-MM-DD'), startDate: this.state.startDate, endDate: this.state.endDate, startTime: this.state.startTime,
        endTime: this.state.endTime,
        daycareName: this.state.selectedValue.name,
        daycareId: this.state.selectedValue.id,
        status: Constants.SCHEDULE_NEW
      }

      this.props.onAddSchedule(newSchedule)
      this.props.navigation.navigate('ScheduleStack')
    } else {
      Alert.alert("", "Select a daycare")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titleRow}>Select a daycare</Text>
          <View style={styles.borderBottomItem}>
            <Picker selectedValue={this.state.selectedValue} onValueChange={(value) => this.setState({ selectedValue: value })}>
              {this.state.pickerItems}
            </Picker>
          </View>
        </View>
        <Text style={styles.titleRow}>Select a date</Text>
        <ModalStackCalendar changeFromValue={this.changeFromValue} changeToValue={this.changeToValue} minDate={new Date()} />
        <Text style={styles.titleRow}>Select a time</Text>
        <View style={[styles.row, styles.test]}>
          <TouchableOpacity style={styles.borderBottomItem} onPress={() => this.openPicker(true)}>
            <View style={styles.row}>
              <View>
                <Text style={styles.dateTitleText}>From</Text>
                <Text style={styles.dateText}>{this.state.startTime}</Text>
              </View>
              <Icon style={styles.icon} name='clock-o' size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.borderBottomItem} onPress={() => this.openPicker(false)}>
            <View style={styles.row}>
              <View>
                <Text style={styles.dateTitleText}>To</Text>
                <Text style={styles.dateText}>{this.state.endTime}</Text>
              </View>
              <Icon style={styles.icon} name='clock-o' size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <ColoredRaisedButton style={styles.button} onPress={() => this.save()}>
          <Text style={styles.labelWhite}>Create</Text>
        </ColoredRaisedButton>

        {this.state.pickerVisible &&
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode={'time'}
            is24Hour={false}
            display="default"
            onChange={(event, date) => this.changePickerValue(date)}
            maximumDate={new Date().setUTCHours(6)}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  test: { //need to finish the design
    paddingLeft: 20,
    paddingRight: 20
  },
  titleRow: {
    color: Constants.AppMainColor,
    paddingTop: 20,
    paddingBottom: 5
  },
  dateTitleText: {
    fontSize: 12,
    color: 'gray'
  },
  dateText: {
    fontSize: 17
  },
  borderBottomItem: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingLeft: 10
  },
  icon: {
    padding: 10,
    color: Constants.AppMainColor
  },
  labelWhite: {
    color: 'white',
    fontSize: 17
  },
  button: {
    margin: 30,
    backgroundColor: Constants.AppMainColor
  },
})

const mapStateToProps = (props) => {
  return {
    user: props.user.user,
    daycares: props.schedules.daycares,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddSchedule: (schedule) => dispatch(addSchedule(schedule))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSchedule)
