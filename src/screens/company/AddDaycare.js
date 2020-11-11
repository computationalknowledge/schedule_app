import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Textfield, ColoredRaisedButton } from 'react-native-material-kit';
import * as Constants from '../../constants'
import { addDaycare } from '../../store/actions/schedule'

class AddDaycare extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            address: '',
            phone: '',
            email: '',
            username: ''
        }
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({ title: "New Daycare" })
    }

    save = () => {
        var newDaycare = { name: this.state.name, address: this.state.address, phone: this.state.phone, email: this.state.email, username: this.state.username, type: Constants.School }
        this.props.onAddDaycare(newDaycare)
        this.props.navigation.navigate('Daycares')
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Textfield
                    value={this.state.name}
                    onTextChange={text => this.setState({ name: text })}
                    tintColor={Constants.AppMainColor}
                    placeholder='Name'
                    style={styles.textfield}
                    style={styles.textfieldWithFloatingLabel}
                />
                <Textfield
                    value={this.state.address}
                    onTextChange={text => this.setState({ address: text })}
                    tintColor={Constants.AppMainColor}
                    placeholder='Address'
                    style={styles.textfield}
                    style={styles.textfieldWithFloatingLabel}
                />
                <Textfield
                    value={this.state.phone}
                    onTextChange={text => this.setState({ phone: text })}
                    tintColor={Constants.AppMainColor}
                    placeholder='Phone Number'
                    style={styles.textfield}
                    style={styles.textfieldWithFloatingLabel}
                />
                <Textfield
                    value={this.state.email}
                    onTextChange={text => this.setState({ email: text })}
                    tintColor={Constants.AppMainColor}
                    placeholder='Email'
                    style={styles.textfield}
                    style={styles.textfieldWithFloatingLabel}
                />
                <Textfield
                    value={this.state.username}
                    onTextChange={text => this.setState({ username: text })}
                    tintColor={Constants.AppMainColor}
                    placeholder='Username'
                    style={styles.textfield}
                    style={styles.textfieldWithFloatingLabel}
                />
                <ColoredRaisedButton style={styles.button} onPress={() => this.save()}>
                    <Text style={styles.labelWhite}>Create</Text>
                </ColoredRaisedButton>
            </ScrollView>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        margin: 30
    },
    textfield: {
        height: 28, // have to do it on iOS
        marginTop: 32,
    },
    textfieldWithFloatingLabel: {
        height: 48, // have to do it on iOS
        marginTop: 10,
    },
    button: {
        backgroundColor: Constants.AppMainColor,
        margin: 20
    },
    labelWhite: {
        color: 'white',
        fontSize: 17
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user: user.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddDaycare: (daycare) => dispatch(addDaycare(daycare))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDaycare)