import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView, StyleSheet } from 'react-native'
import * as Constants from '../constants'

export default class Container extends Component {
    render() {
        return (
            <LinearGradient 
                //colors={['#6B24AA', '#6B24AA','#AC2688']}
                colors={[Constants.AppSecondMainColor , Constants.AppMainColor, Constants.AppMainColor]}
                style={ styles.container }>
                <SafeAreaView style={styles.container}>{this.props.children}</SafeAreaView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
