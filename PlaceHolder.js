import React, { Component } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet
       } from 'react-native';

// import WaterIntake from './WaterIntake';

export default class PlaceHolder extends Component {
  constructor(props) {
    super(props);
  }

  _navigate(property) {
    this.props.navigator.push({
      title: 'WaterIntake', // Matches route.name
      index: 1,
      passProps: {
        name: property
      },
      type: "back"
    })
  }

  render() {
    return (
        <View>
          <View style={styles.toolbar}>
            <TouchableHighlight>
              <Text style={styles.toolbarBtn}
                    onPress={this._navigate.bind(this, 'Hello from PH')}>Back</Text>
            </TouchableHighlight>
            <Text style={styles.toolbarTitle}>WaterBuddy</Text>
          </View>
          <Text>Placeholder...</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#a7d5f6',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarBtn: {
    width: 50,
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  }
});
