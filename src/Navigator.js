import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Schedule from './screens/Schedule'
import NewSchedule from './screens/NewSchedule'
import ScheduleList from './screens/company/ScheduleList'
import Login from './screens/Login'
import ControlPanel from './screens/company/ControlPanel'
import AddDaycare from './screens/company/AddDaycare'
import Daycare from './screens/company/Daycare'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function ScheduleStack() {
  return (
    <Stack.Navigator
      initialRouteName="ScheduleLis"
      screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="ScheduleLis"
        component={ScheduleList}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NewSchedule"
        component={NewSchedule}
      />
    </Stack.Navigator>
  )
}

function CalendarScheduleStack() {
  return (
    <Stack.Navigator
      initialRouteName="Schedule"
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen
        name="Schedule"
        component={Schedule}
      />
    </Stack.Navigator>
  )
}

function CompanyDaycareScheduleStack() {
  return (
    <Stack.Navigator
      initialRouteName="Daycare"
      screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="Daycare"
        component={Daycare}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

function ControlPanelStack() {
  return (
    <Stack.Navigator
      initialRouteName="ControlPanel"
      screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="ControlPanel"
        component={ControlPanel}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddDaycare"
        component={AddDaycare}
      />
    </Stack.Navigator>
  )
}


function renderCompanyNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ScheduleStack" component={ScheduleStack}
        options={{
          tabBarLabel: 'Schedules',
          tabBarIcon: ({ color }) => (
            <Icon name='calendar-multiple' size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Schedule" component={CalendarScheduleStack}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => (
            <Icon name='calendar' size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Daycares" component={CompanyDaycareScheduleStack}
        options={{
          tabBarLabel: 'Daycares',
          tabBarIcon: ({ color }) => (
            <Icon name='domain' size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Control Panel" component={ControlPanelStack}
        options={{
          tabBarLabel: 'Control Panel',
          tabBarIcon: ({ color }) => (
            <Icon name='cogs' size={25} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        {this.props.user == null && <Login />}
        {this.props.user != null && renderCompanyNavigator()}
      </NavigationContainer>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.user
  }
}

export default connect(mapStateToProps)(Navigator)