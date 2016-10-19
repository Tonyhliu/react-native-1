import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import WaterIntake from './WaterIntake';

export default class HomePage extends Component {
  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }

  _navigate(property){
    this.props.navigator.push({
      title: 'WaterIntake', // Matches route.name
      index: 1,
      passProps: {
        name: property
      }
    })
  }

  render() {
    return (
      <View>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarBtn}>Back</Text>
          <Text style={styles.toolbarTitle}>WaterBuddy</Text>
          <TouchableHighlight>
            <Text style={styles.toolbarBtn}
                  onPress={this._navigate.bind(this, 'Hello World')}>Next</Text>
          </TouchableHighlight>
        </View>
        <Text>{this.props.title}</Text>
      </View>
    )
  }
}
// <Text>Hello</Text>
// <Text>Current Scene: { this.props.title }</Text>
// <TouchableHighlight onPress={this.props.onForward}>
// <Text>Tap me to load the next scene</Text>
// </TouchableHighlight>
// <TouchableHighlight onPress={this.props.onBack}>
// <Text>Tap me to go back</Text>
// </TouchableHighlight>
// </View>

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
