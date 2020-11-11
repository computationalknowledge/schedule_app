import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Alert, Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'
import moment from "moment";
import * as Constants from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ModalStackCalendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            firstSelected: false,
            textCalendar: '',
            textCalendarDate: '',
            markedDates: {},
            startDate: null,
            endDate: null
        }
    }

    componentDidMount = () => {
        this.setState({ startDate: moment(this.props.startDate).format('YYYY-MM-DD') })
        this.setState({ endDate: moment(this.props.endDate).format('YYYY-MM-DD') })
    }

    dateSelected = (day) => {
        // if(!this.state.firstSelected && moment(day).diff(moment(this.state.startDate), 'days') < 0){

        // }

        if (moment(day).subtract(1, 'months').isoWeekday() > 5) {
            Alert.alert('The selected day can\'t be in the weekend.')
            return
        }

        let strDate = moment(day).subtract(1, 'months').format('YYYY-MM-DD')
        this.setState({ markedDates: { [strDate]: { selected: true, selectedColor: Constants.AppMainColor } } })
        this.setState({ textCalendarDate: moment(day).subtract(1, 'months').format('ddd, MMM DD, YYYY') })
        if (this.state.firstSelected) {
            this.props.changeFromValue(strDate)
            this.setState({ startDate: strDate })
        } else {
            this.props.changeToValue(strDate)
            this.setState({ endDate: strDate })
        }
    }

    openCalendar = (firstSelected) => {
        this.setState({ firstSelected })
        this.changeDateValues(firstSelected)
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    changeDateValues = (firstSelected) => {
        if (firstSelected) {
            this.setState({ textCalendar: 'From' })
            this.setState({ textCalendarDate: moment(this.state.startDate).format('ddd, MMM DD, YYYY') })
            this.setState({ markedDates: { [this.state.startDate]: { selected: true, selectedColor: Constants.AppMainColor } } })
        } else {
            this.setState({ textCalendar: 'To' })
            this.setState({ textCalendarDate: moment(this.state.endDate).format('ddd, MMM DD, YYYY') })
            this.setState({ markedDates: { [this.state.endDate]: { selected: true, selectedColor: Constants.AppMainColor } } })
        }
    }

    nextCalendar = () => {
        if (this.state.firstSelected) {
            this.changeDateValues(!this.state.firstSelected)
            this.setState({ firstSelected: !this.state.firstSelected })
        } else {
            this.setState({ modalVisible: !this.state.modalVisible })
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.dateItem} disabled={this.props.disabled} onPress={() => this.openCalendar(true)}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.dateTitleText}>From</Text>
                            <Text style={styles.dateText}>{moment(this.state.startDate).format('dddd, MMM DD, YYYY')}</Text>
                        </View>
                        <Icon style={styles.icon} name='calendar' size={20} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateItem} disabled={this.props.disabled} onPress={() => this.openCalendar(false)}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.dateTitleText}>To</Text>
                            <Text style={styles.dateText}>{moment(this.state.endDate).format('dddd, MMM DD, YYYY')}</Text>
                        </View>
                        <Icon style={styles.icon} name='calendar' size={20} />
                    </View>
                </TouchableOpacity>
                <Modal
                    style={styles.modalView}
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalFormat}>
                            <Text style={styles.calendarTitleText}>{this.state.textCalendar}</Text>
                            <View style={styles.calendarTitleDate}>
                                <Text style={styles.calendarDateText}>{this.state.textCalendarDate}</Text>
                            </View>
                            <Calendar
                                minDate={this.props.minDate}
                                maxDate={this.props.maxDate}
                                markedDates={this.state.markedDates}
                                onDayPress={(day) => this.dateSelected(day)} />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    //style={{ ...styles.openButton, backgroundColor: Constants.AppMainColor }}
                                    onPress={() => { this.openCalendar() }}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    //style={{ ...styles.openButton, backgroundColor: Constants.AppMainColor }}
                                    onPress={() => { this.nextCalendar() }}
                                    visible={false}>
                                    <Text style={styles.textStyle}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(1,1,1,0.5)',
        flex: 1,
        justifyContent: 'center'
    },
    modalFormat: {
        margin: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginRight: 30
    },
    dateTitleText: {
        fontSize: 12,
        color: 'gray'
    },
    calendarTitleText: {
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 5
    },
    calendarTitleDate: {
        backgroundColor: Constants.AppMainColor,
        padding: 20
    },
    calendarDateText: {
        fontSize: 25,
        color: 'white'
    },
    dateText: {
        fontSize: 17
    },
    dateItem: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 10
    },
    icon: {
        padding: 10,
        color: Constants.AppMainColor
    },
    modalView: {
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: Constants.AppMainColor,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    button: {
        margin: 30,
        backgroundColor: Constants.AppMainColor
    },
    textStyle: {
        color: Constants.AppMainColor,
        fontSize: 16,
        padding: 15,
        paddingLeft: 40
    }
})