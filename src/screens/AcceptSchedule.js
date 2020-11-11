import React, { Component } from 'react'
import { ToastAndroid, Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements';
import { ColoredRaisedButton } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from "moment";
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as Constants from '../constants'

class AcceptSchedule extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //schedules: []
    }
  }

  componentDidMount = () => {
    //this.fetchSchedules()
    if (this.props.user.type == Constants.Company) {
      this.props.navigation.setOptions({ title: this.props.route.params.worker.name.split(' ')[0] + "'s Schedule" })
    }else{
      this.props.navigation.setOptions({ title: "Waiting Acceptance" })
    }
  }

  // fetchSchedules = () => {
  //   var firebaseRef = firebase.firestore().collection("schedule_user")
  //   if (this.props.user.type == Constants.Company) {
  //     firebaseRef = firebaseRef.where("userId", "==", this.props.route.params.id)
  //   } else {
  //     firebaseRef = firebaseRef.where("userId", "==", this.props.user.id).where("status", "==", Constants.WORKER_SCHEDULE_WAITING_ACCEPT)
  //   }

  //   firebaseRef.onSnapshot((rawItems) => {
  //     var items = []
  //     rawItems.forEach((item) => {
  //       items.push({
  //         ...item.data(),
  //         id: item.id
  //       })
  //     })
  //     this.setState({ schedules: items });
  //   })
  // }

  // import {
  //     ToastAndroid,
  //     Platform,
  //     AlertIOS,
  //   } from 'react-native';

  // function notifyMessage(msg: string) {
  // if (Platform.OS === 'android') {
  //   ToastAndroid.show(msg, ToastAndroid.SHORT)
  // } else {
  //   AlertIOS.alert(msg);
  // }
  // }

  updateScheduleStatus = (schedule, value) => {
    firebase.firestore().collection("schedule_user").doc(schedule.id).update({
      'status': value
    })
      .catch(err => console.log(err))
      .then(res => {
        if (value == Constants.WORKER_SCHEDULE_ACCEPTED) {
          ToastAndroid.show("Schedule Accepted", ToastAndroid.SHORT)
        } else {
          ToastAndroid.show("Schedule Refused", ToastAndroid.SHORT)
        }
        firebase.firestore().collection('schedule_user').where("scheduleId", "==", schedule.scheduleId)
          .onSnapshot((rawItems) => {
            var updateStatus = true
            rawItems.forEach((item) => {
              if (item.data().status != Constants.WORKER_SCHEDULE_ACCEPTED) {
                updateStatus = false
              }
            })

            if(updateStatus){
              firebase.firestore().collection("schedules").doc(schedule.scheduleId).update({
                'status': Constants.SCHEDULE_CONFIRMED
              })
                .catch(err => console.log(err))
                .then(res => {
                })
            }
          })
      })
  }

  renderStatusStyle = (status) => {
    if (status == Constants.WORKER_SCHEDULE_WAITING_ACCEPT) {
      return styles.infoColor
    } else if (status == Constants.WORKER_SCHEDULE_ACCEPTED) {
      return styles.acceptedColor
    } else if (status == Constants.WORKER_SCHEDULE_REFUSED) {
      return styles.refusedColor
    } else {
      return styles.canceledColor
    }
  }

  renderStatusText = (status) => {
    if (status == Constants.WORKER_SCHEDULE_WAITING_ACCEPT) {
      return "Awaiting acceptance"
    } else if (status == Constants.WORKER_SCHEDULE_ACCEPTED) {
      return "Accepted"
    } else if (status == Constants.WORKER_SCHEDULE_REFUSED) {
      return "Refused"
    } else if (status == Constants.WORKER_SCHEDULE_CANCELED) {
      return "Canceled"
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.route.params.schedules}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) =>
            <View style={styles.itemContainer}>
              {this.props.user.type != Constants.Worker &&
                <View style={[styles.sideInfo, this.renderStatusStyle(item.status)]}></View>
              }
              <View style={styles.itemRow}>
                <View style={styles.row}>
                  <Text style={styles.schoolName}>{item.schedule.daycare.name}</Text>
                  <Text style={styles.creationDate}>{moment(item.schedule.creationDate).format('MMM DD, YYYY')}</Text>
                </View>
                <Divider style={styles.separator} />
                {this.props.user.type == Constants.Worker &&
                  <TouchableOpacity style={styles.row}>
                    <Icon style={styles.icon} name='map-marker' size={20} />
                    <Text>{item.schedule.daycare.address}</Text>
                  </TouchableOpacity>
                }
                <View style={styles.dateRow}>
                  <View style={styles.row}>
                    <Icon style={styles.icon} name='calendar-import' size={20} />
                    <Text style={styles.text}>{moment(item.startDate).format('dddd, MMMM DD, YYYY')}</Text>
                  </View>
                  <View style={styles.row}>
                    <Icon style={styles.icon} name='clock-start' size={20} />
                    <Text style={styles.text}>{item.schedule.startTime}</Text>
                  </View>
                </View>
                <View style={styles.dateRow}>
                  <View style={styles.row}>
                    <Icon style={styles.icon} name='calendar-export' size={20} />
                    <Text style={styles.text}>{moment(item.endDate).format('dddd, MMMM DD, YYYY')}</Text>
                  </View>
                  <View style={styles.row}>
                    <Icon style={styles.icon} name='clock-end' size={20} />
                    <Text style={styles.text}>{item.schedule.endTime}</Text>
                  </View>
                </View>
                {this.props.user.type == Constants.Company &&
                  <View style={styles.dateRow}>
                    <View style={styles.row}>
                      <Text>{this.renderStatusText(item.status)}</Text>
                    </View>
                  </View>
                }
                {/* {this.props.user.type == Constants.Worker &&
                          <View style={styles.dateRow}>
                            <View style={styles.row}>
                              <Icon style={styles.icon} name='account' size={20} />
                              <Text>{item.userAssigned}</Text>
                            </View>
                          </View>
                          } */}
                {this.props.user.type == Constants.Worker &&
                  <View style={styles.buttonsRow}>
                    <ColoredRaisedButton style={styles.refuseButton} onPress={() => this.updateScheduleStatus(item, Constants.WORKER_SCHEDULE_REFUSED)}>
                      <Text style={styles.labelRefuse}>Refuse</Text>
                    </ColoredRaisedButton>
                    <ColoredRaisedButton style={styles.acceptButton} onPress={() => this.updateScheduleStatus(item, Constants.WORKER_SCHEDULE_ACCEPTED)}>
                      <Text style={styles.labelWhite}>Accept</Text>
                    </ColoredRaisedButton>
                  </View>
                }
              </View>
            </View>
          } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sideInfo: {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    width: 10
  },
  mainColor: {
    backgroundColor: '#5ec639',
  },
  canceledColor: {
    backgroundColor: 'red',
  },
  infoColor: {
    backgroundColor: Constants.WaitingAssigmentColor
  },
  refusedColor: {
    backgroundColor: 'orange'
  },
  acceptedColor: {
    backgroundColor: Constants.AppMainColor
  },
  itemRow: {
    padding: 15,
    flex: 1
  },
  itemContainer: {
    margin: 10,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row'
  },
  schoolName: {
    fontSize: 17,
    fontWeight: "bold",
    maxWidth: 250
  },
  separator: {
    backgroundColor: Constants.AppMainColor,
    marginTop: 2,
    marginBottom: 12
  },
  row: {
    flexDirection: 'row'
  },
  buttonsRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 40,
    paddingTop: 10
  },
  acceptButton: {
    margin: 5,
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: Constants.AppMainColor
  },
  refuseButton: {
    margin: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  labelRefuse: {
    color: Constants.AppMainColor,
    fontSize: 17
  },
  labelWhite: {
    color: 'white',
    fontSize: 17
  },
  text: {
    paddingLeft: 3
  },
  creationDate: {
    color: Constants.AppMainColor,
    paddingTop: 3,
    marginLeft: 'auto'
  },
  icon: {
    color: Constants.AppMainColor
  }
})

const mapStateToProps = ({ user }) => {
  return {
    user: user.user
  }
}

export default connect(mapStateToProps)(AcceptSchedule)