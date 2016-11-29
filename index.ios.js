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
  Text,
  TouchableHighlight,
  Alert,
  AlertIOS,
  Image,
  View
} from 'react-native';
import Exponent from 'exponent';
import TabNavigator from 'react-native-tab-navigator';
import { Button } from 'react-native-elements';
import HomePage from './HomePage';
import IntakeCalculator from './IntakeCalculator';
import PlaceHolder from './PlaceHolder';
import About from './About';
import Login from './Login';

class WaterBuddy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'login',
      username: '',
      userId: ''
    };

    this.loginUser = this.loginUser.bind(this);
  }

  // async _logIn() {
  // const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
  //   '874143415951230', {
  //   permissions: ['public_profile'],
  // });
  //
  // if (type === 'success') {
  // // Get the user's name using Facebook's Graph API
  //   const response = await fetch(
  //   `https://graph.facebook.com/me?access_token=${token}`);
  //     Alert.alert(
  //       'Logged in!',
  //       `Hi ${(await response.json()).name}!`,
  //     );
  //   }
  // }

  loginUser(name, userId) {
    this.setState({selectedTab: 'home',
                  username: name,
                  userId: userId });
  }

  render() {
    if (this.state.selectedTab === 'login') {
      return (
        <Login login={this.loginUser}/>
      );
    } else {
      return(
        <TabNavigator tabBarStyle={{height: 60}}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => <Image source={require('./img/homeIcon.png')} />}
            renderSelectedIcon={() => <Image source={require('./img/homeIcon.png')} />}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <HomePage username={this.state.username}
                      userId={this.state.userId} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'calculator'}
            title="Calculator"
            renderIcon={() => <Image source={require('./img/calculatorIcon.png')} />}
            renderSelectedIcon={() => <Image source={require('./img/calculatorIcon.png')} />}
            onPress={() => this.setState({ selectedTab: 'calculator' })}>
            <IntakeCalculator />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'reminder'}
            title="Reminder"
            renderIcon={() => <Image source={require('./img/reminderIcon.png')} />}
            renderSelectedIcon={() => <Image source={require('./img/reminderIcon.png')} />}
            onPress={() => this.setState({ selectedTab: 'reminder' })}>
            <PlaceHolder />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'about'}
            title="About"
            renderIcon={() => <Image source={require('./img/about.png')} />}
            renderSelectedIcon={() => <Image source={require('./img/about.png')} />}
            onPress={() => this.setState({ selectedTab: 'about' })}>
            <About />
          </TabNavigator.Item>
        </TabNavigator>
      );
    }
  }
}

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

Exponent.registerRootComponent(WaterBuddy);
