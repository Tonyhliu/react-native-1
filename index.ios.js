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

import HomePage from './HomePage';
import WaterIntake from './WaterIntake';

class WaterBuddy extends Component {
  _renderScene(route, nav) {
    switch (route.index) {
      case 0:
        // console.log("MADE Izzz");
        // console.log(route.passProps);
        return <HomePage navigator={nav}
                          title={route.title}
                          {...route.passProps} />
        break;
      case 1:
        return <WaterIntake navigator={nav}
                            title={route.title}
                            {...route.passProps} />
        break;
      default:
    }
  }

  _configureScene(route, routeStack) {
    if (route.type === "back") {
      return Navigator.SceneConfigs.FloatFromLeft
      // return Navigator.SceneConfigs.PushFromRight
      // return Navigator.SceneConfigs.FloatFromBottom
    }
    return Navigator.SceneConfigs.HorizontalSwipeJump
  }

  render() {
    const routes = [
      {title: 'Home Page', index: 0},
      {title: 'WaterIntake', index: 1},
    ];

    return(
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        configureScene={this._configureScene}

        renderScene={this._renderScene} />
    )
  }
}


// return(
//   <Navigator
//     initialRoute={routes[0]}
//     initialRouteStack={routes}
//
//     renderScene={(route, navigator) => {
//       return (<HomePage
//         title={route.title}
//         // function to call when new scene should be displayed
//         onForward={() => {
//           if (route.index === 0) {
//             navigator.push(routes[1]);
//           } else {
//             navigator.pop();
//           }
//         }}
//
//         // function to call to go back to previous scene
//         onBack={() => {
//           if (route.index > 0) {
//             navigator.pop();
//           }
//         }}
//       />)
    // }}
  // />
// )

AppRegistry.registerComponent('HelloWorld', () => WaterBuddy);

// Activity Level: Finally you will want to adjust that number
// based on how often you work out, since you are expelling water
// when you sweat. You should add 12 ounces of water to your daily
// total for every 30 minutes that you work out. So if you work out
// for 45 minutes daily, you would add 18 ounces of water to your daily intake.
