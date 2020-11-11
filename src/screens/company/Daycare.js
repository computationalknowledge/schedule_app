import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'

class Daycare extends Component {

    constructor(props) {
        super(props);

        this.state = {
            daycares: [],
            search: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar placeholder='Type here...'
                    darkTheme round
                    onChangeText={(text) => this.onSearchChangeText(text)}
                    onSubmitEditing={() => this.fetchDaycares()}
                    value={this.state.search} />
                <FlatList
                    data={this.props.daycares}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <TouchableOpacity>
                            <ListItem
                                key={item.id}
                                title={item.name}
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

const mapStateToProps = (props) => {
    return {
        daycares: props.schedules.daycares,
    }
}

export default connect(mapStateToProps)(Daycare)