import { StyleSheet } from 'react-native'
import * as Constants from './constants'

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
        backgroundColor: '#2CD8F3',
    },
    canceledColor: {
        backgroundColor: 'red',
    },
    infoColor: {
        backgroundColor: Constants.WaitingAssigmentColor
    },
    refusedColor: {
        backgroundColor: '#9C27B0'
    },
    acceptedColor: {
        backgroundColor: '#5ec639'
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

export default styles