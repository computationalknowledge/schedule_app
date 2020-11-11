import React, { Component } from 'react'
import { AppRegistry, YellowBox, Platform, Alert } from 'react-native';
import { name as appName } from './app.json';
import Navigator from './src/Navigator'
import { Provider } from 'react-redux'

import storeConfig from './src/store/storeConfig'

YellowBox.ignoreWarnings(['Setting a timer']);

const store = storeConfig();

class Redux extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };
  }

  onAuthStateChanged = (user) => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => Redux);