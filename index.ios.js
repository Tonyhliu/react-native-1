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
  TouchableHighlight,
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
        style={{flex:1}}
        initialRouteStack={routes}
        configureScene={this._configureScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.nav}
            routeMapper={NavigationBarRouteMapper} />
        }

        renderScene={this._renderScene} />
    )
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
        	 underlayColor="#a7d5f6"
           onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={styles.leftNavButtonText}>Back</Text>
        </TouchableHighlight>
  	)}
    else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if (index === 1) return ( <TouchableHighlight
    														onPress={() => navigator.push({
                                  title: 'PlaceHolder',
                                  index: 2
                                }) }>
                                <Text style={styles.rightNavButtonText}>
                                  	{route.rightText || 'Next Btn'}
                                </Text>
                              </TouchableHighlight> )
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>WaterBuddy</Text>
  }
};

var styles = StyleSheet.create({
  // mainContainer: {
  // 	flex: 4,
  //   flexDirection: 'column',
  //   marginTop: 100,
  // },
  leftNavButtonText: {
  	fontSize: 18,
    marginLeft:13,
    marginTop:2
  },
  rightNavButtonText: {
  	fontSize: 18,
    marginRight:13,
    marginTop:2
  },
  nav: {
  	height: 60,
    backgroundColor: '#a7d5f6'
  },
  title: {
  	marginTop:4,
    fontSize:16
  },
  button: {
  	height:60,
    marginBottom:10,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('WaterBuddy', () => WaterBuddy);
