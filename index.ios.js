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
import PlaceHolder from './PlaceHolder';

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
      case 2:
        return <PlaceHolder navigator={nav}
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
      {title: 'PlaceHolder', index: 2},
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

AppRegistry.registerComponent('HelloWorld', () => WaterBuddy);
