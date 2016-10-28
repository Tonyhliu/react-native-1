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

  render() {
    return (
        <View>
          <View style={styles.firstContainer}>
            <View style={{height: 50}}>
              <Text style={{fontFamily: 'Verdana', color: '#9fc9e1', fontSize: 20, fontWeight: 'bold'}}>WATERBUDDY</Text>
            </View>
          </View>
          <Text>Placeholder...</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  firstContainer: {
    height: 350,
    alignItems: 'center',
    // justifyContent: 'center'
  }
});
