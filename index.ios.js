/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import WaterIntake from './WaterIntake';

class WaterBuddy extends Component {
  render() {
    return(
      <Navigator
        initialRoute={{ title: 'Initial Scene', index: 0}}
        renderScene={(route, navigator) => {
          return (<WaterIntake
            title={route.title}

            // function to call when new scene should be displayed
            onForward={() => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // function to call to go back to previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />)
        }}
      />
    )
  }
}

AppRegistry.registerComponent('HelloWorld', () => WaterBuddy);

// Activity Level: Finally you will want to adjust that number
// based on how often you work out, since you are expelling water
// when you sweat. You should add 12 ounces of water to your daily
// total for every 30 minutes that you work out. So if you work out
// for 45 minutes daily, you would add 18 ounces of water to your daily intake.
