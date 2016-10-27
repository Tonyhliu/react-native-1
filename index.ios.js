/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// When you want to convert it, you'll just need to do something like this: "import Icon from 'react-native-vector-icons/Ionicons'" becomes "import { Ionicons as Icon } from '@exponent/vector-icons'"

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight,
  Image,
  View
} from 'react-native';
import Exponent from 'exponent';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomePage from './HomePage';
import WaterIntake from './WaterIntake';
import PlaceHolder from './PlaceHolder';

class WaterBuddy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home'
    }
  }

  _renderScene(route, nav) {
    switch (route.index) {
      case 0:
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
    }
    return Navigator.SceneConfigs.HorizontalSwipeJump
  }

  render() {
    const routes = [
      {title: 'Home Page', index: 0},
      {title: 'WaterIntake', index: 1},
      {title: 'PlaceHolder', index: 2},
    ];

    // <Navigator
    //   initialRoute={routes[0]}
    //   style={{flex:1}}
    //   initialRouteStack={routes}
    //   configureScene={this._configureScene}
    //   navigationBar={
    //     <Navigator.NavigationBar
    //       style={styles.nav}
    //       routeMapper={NavigationBarRouteMapper} />
    //   }
    //
    //   renderScene={this._renderScene} />
    return(
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Image source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTbU_fkOiCC3R2gM0Zr9viou2v3Cbxn6qNTVPAk4d-MshmnM3GU5SAz-pA'}} />}
          renderSelectedIcon={() => <Image source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTbU_fkOiCC3R2gM0Zr9viou2v3Cbxn6qNTVPAk4d-MshmnM3GU5SAz-pA'}} />}
          badgeText="1"
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <HomePage />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'calculator'}
          title="Calculator"
          renderIcon={() => <Icon.Button name='calculator' />}
          renderSelectedIcon={() => <Icon.Button name='calculator' />}
          badgeText="2"
          onPress={() => this.setState({ selectedTab: 'calculator' })}>
          <WaterIntake />
        </TabNavigator.Item>
      </TabNavigator>
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
    fontSize:16,
    fontFamily: 'Arial',
    fontWeight: 'bold'
  },
  button: {
  	height:60,
    marginBottom:10,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

// AppRegistry.registerComponent('WaterBuddy', () => WaterBuddy);
// AppRegistry.registerComponent('main', () => WaterBuddy);
Exponent.registerRootComponent(WaterBuddy)
