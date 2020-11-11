import React, { Component } from 'react'
import { Text, Button, View, Image, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ColoredRaisedButton } from 'react-native-material-kit';
import { logOutUser } from '../../store/actions/user'
import Container from '../../component/Container'
import * as Constants from '../../constants'

class ControlPanel extends Component {

    logout = () => {
        this.props.onLogOut()
    }

    addNewDaycare = () => {
        this.props.navigation.navigate('AddDaycare')
    }

    render() {
        return (
            <Container>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.item} onPress={() => this.addNewDaycare()}>
                        <Text style={styles.itemName}>Create new Daycare</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => this.logout()}>
                        <Text style={styles.itemName}>Log out</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{this.props.user.name}</Text>
                <View style={styles.innerContainer}>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        position: 'absolute',
        top: 115,
        zIndex: 2,
        right: 20,
        left: 20
    },
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 15,
        elevation: 2
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#eef5fb',
        bottom: 0,
    },
    itemName: {
        color: Constants.AppMainColor,
        fontSize: 17,
        fontWeight: "bold"
    },
    name: {
        color: 'white',
        fontSize: 27,
        padding: 40,
        paddingBottom: 70,
        fontWeight: "bold"
    },
    labelWhite: {
        color: 'white',
        fontSize: 17
    },
    button: {
        marginTop: 40
    }
})


const mapStateToProps = ({ user }) => {
    return {
        user: user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(logOutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)