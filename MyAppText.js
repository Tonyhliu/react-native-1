import React, { Component } from 'react';
import { View,
        Text,
        StyleSheet
       } from 'react-native';


export default class MyAppText extends Component {
  render() {
    return(
      <Text style={{fontFamily: 'Menlo', fontSize: 12}}>
        {this.props.children}
      </Text>
    )
  }
}
