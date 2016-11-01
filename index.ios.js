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
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';

import HomePage from './HomePage';
import WaterIntake from './WaterIntake';
import PlaceHolder from './PlaceHolder';
import About from './About';
import Login from './Login';

class WaterBuddy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home'
    }

    this._changeSelected = this._changeSelected.bind(this);
  }

  componentWillMount() {
    // this._logIn();
  }

  // async _logIn() {
  //   // <Exponent.Facebook.logInWithReadPermissionsAsync(874143415951230) />
  // // console.log("made it to log in");
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


  // <TabNavigator.Item
  //   selected={this.state.selectedTab === 'login'}
  //   title="Login"
  //   renderIcon={() => <Image source={require('./img/homeIcon.png')} />}
  //   renderSelectedIcon={() => <Image source={require('./img/homeIcon.png')} />}
  //   onPress={() => this.setState({ selectedTab: 'login' })}>
  //   <Login/>
  // </TabNavigator.Item>

  _changeSelected() {
    this.setState({selectedTab: 'home'})
  }

  render() {
    // let tbStyle = this.state.hideNavBar ? { height: 0, overflow: 'hidden' } : {};
    let tbStyle = {height: 60};
    if (this.state.selectedTab === 'login') {
      return (
        <Login changeSelected={this._changeSelected}/>
      )
    } else {
      return(
        <TabNavigator tabBarStyle={tbStyle}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => <Image source={require('./img/homeIcon.png')} />}
            renderSelectedIcon={() => <Image source={require('./img/homeIcon.png')} />}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <HomePage/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'calculator'}
            title="Calculator"
            renderIcon={() => <Image source={require('./img/calculatorIcon.png')} />}
            renderSelectedIcon={() => <Image source={require('./img/calculatorIcon.png')} />}
            onPress={() => this.setState({ selectedTab: 'calculator' })}>
            <WaterIntake />
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
      )
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

Exponent.registerRootComponent(WaterBuddy)
