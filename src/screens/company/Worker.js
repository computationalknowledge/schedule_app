import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, FlatList, Modal, TouchableHighlight } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements'
// import * as firebase from 'firebase';
// import 'firebase/firestore';
import * as Constants from '../../constants'
import axios from 'axios';

export default class Worker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      workers: [],
      search: ''
    }
  }

  componentDidMount = () => {
    this.fetchWorkers()
  }

  showOverview = (item) => {
    axios.get(Constants.API_ADDRESS + "/getWorker", {params: { id: item._id }})
      .then((response) => {
        if(response.data != null){
          this.props.navigation.navigate('CompanyWorkerOverview', response.data)
        }
      })
  }

  onSearchChangeText = (text) => {
    this.setState({ search: text })
    if (text == '') {
      this.fetchWorkers()
    }
  }

  fetchWorkers = () => {
    var params = null;

    if (this.state.search != '') {
      params = { params: { name: this.state.search } }
    }

    axios.get(Constants.API_ADDRESS + "/getWorkers", params)
      .then((response) => {
        this.setState({ workers: response.data });
      })
  }

  // fetchWorkers = (isSearch = false) => {    
  //   var firebaseCon = firebase.firestore().collection('user');

  //   if(isSearch){
  //     firebaseCon = firebaseCon.orderBy('name').startAt(this.state.search).endAt(this.state.search + "\uf8ff")
  //   }

  //   firebaseCon.where("type", "==", Constants.Worker).onSnapshot((rawItems) => {
  //     var items = []
  //     rawItems.forEach((item) => {
  //       items.push({
  //         ...item.data(),
  //         id: item.id
  //       })
  //     })
  //     this.setState({ workers: items });
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar placeholder='Type here...'
          darkTheme round
          onChangeText={(text) => this.onSearchChangeText(text)}
          onSubmitEditing={() => this.fetchWorkers()}
          value={this.state.search} />
        <FlatList
          data={this.state.workers}
          keyExtractor={item => `${item._id}`}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this.showOverview(item)}>
              <ListItem
                key={item._id}
                title={item.name + " " + item.lastName}
                //subtitle={l.subtitle}
                //badge={{ value: 3, textStyle: { color: 'white' }, containerStyle: { marginTop: 0 } }}
                bottomDivider
                chevron
              />
            </TouchableOpacity>
          } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
