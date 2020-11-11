import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { logInUser } from '../store/actions/user'
import { Textfield, ColoredRaisedButton } from 'react-native-material-kit';
import * as Constants from '../constants'
import Container from '../component/Container'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    login = (user) => {
        this.props.onLogIn(user)
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Textfield
                        value={this.state.username}
                        onTextChange={text => this.setState({ username: text })}
                        tintColor={Constants.AppMainColor}
                        placeholder='Username'
                        style={styles.textfield}
                        style={styles.textfieldWithFloatingLabel}
                    />
                    <Textfield
                        value={this.state.password}
                        onTextChange={text => this.setState({ password: text })}
                        tintColor={'#000000'}
                        password={true}
                        placeholder='Password'
                        style={styles.textfield}
                        style={styles.textfieldWithFloatingLabel}
                    />
                    <ColoredRaisedButton style={styles.button} onPress={() => this.login('marta')}>
                        <Text style={styles.labelWhite}>Login</Text>
                    </ColoredRaisedButton>
                </View>
            </Container>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        margin: 30,
        justifyContent: "center"
    },
    textfield: {
        height: 28, // have to do it on iOS
        marginTop: 32,
    },
    textfieldWithFloatingLabel: {
        height: 48, // have to do it on iOS
        marginTop: 10,
    },
    labelWhite: {
        color: Constants.AppMainColor,
        fontSize: 17
    },
    button: {
        backgroundColor: 'white',
        marginTop: 40
    }
}


const mapStateToProps = ({ user }) => {
    return {
        user: user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (user) => dispatch(logInUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)