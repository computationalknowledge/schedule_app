import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ScheduleItem from '../../component/ScheduleItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Constants from '../../constants'
import { connect } from 'react-redux'
import ActionButton from 'react-native-action-button';
import Container from '../../component/Container'

class ScheduleList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      schedules: []
    }
  }

  newSchedule = () => {
    this.props.navigation.navigate('NewSchedule')
  }

  componentDidMount = () => {
    this.setState({schedules : this.props.schedules})
  }

  render() {
    return (
      <Container>
        <FlatList
          data={this.state.schedules}
          contentContainerStyle={styles.scheduleList}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) =>
            <ScheduleItem key={item.id} schedule={item} />}
        />
        {this.props.route.params == null ?
          <ActionButton renderIcon={(active) => (active ? <Icon name='plus' color={'white'} size={30} /> : <Icon name='dots-vertical' color={'white'} size={30} />)}
            bgOpacity={0.4} bgColor="#000000" buttonColor={Constants.AppMainColor}>
            <ActionButton.Item buttonColor='#9b59b6' title="New Schedule" onPress={this.newSchedule}>
              <Icon name="calendar-plus" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton> : null}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scheduleList: {
    paddingBottom: 15
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 55,
    right: 20,
    zIndex: 2,
    backgroundColor: Constants.AppMainColor
  },
  centeredView: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 0,
    padding: 20
  },
  textfield: {
    height: 28, // have to do it on iOS
    marginTop: 32,
  },
  textfieldWithFloatingLabel: {
    height: 48, // have to do it on iOS
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateTitleText: {
    fontSize: 12
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
  button: {
    backgroundColor: Constants.AppMainColor,
    margin: 20
  },
  labelWhite: {
    color: 'white',
    fontSize: 17
  }
})

const mapStateToProps = (props) => {
  return {
    schedules: props.schedules.schedules,
  }
}

export default connect(mapStateToProps)(ScheduleList)