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
import * as firebase from 'firebase';
// import Icon from 'react-native-vector-icons/MaterialIcons';

var config = {
  apiKey: "AIzaSyCu7-RQHAXaQEd2eUADLtccRN_nzmb3evs",
  authDomain: "waterbuddyapp-640d4.firebaseapp.com",
  databaseURL: "https://waterbuddyapp-640d4.firebaseio.com",
  storageBucket: "gs://waterbuddyapp-640d4.appspot.com",
};
firebase.initializeApp(config);

// var provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({
//   'login_hint': 'user@example.com'
// });
// firebase.auth().signInWithRedirect(provider);
// firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     console.log("token is: " + token);
//     // ...
//   }
//   // The signed-in user info.
//   console.log("user is: " + user);
//   var user = result.user;
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });


class WaterBuddy extends Component {
  constructor(props) {
    super(props);

    // const fireBaseConnection = new Firebase('https://waterbuddyapp-640d4.firebaseio.com/');
    // fireBaseConnection.set({
    //   FirstName: 'Hello World',
    //   LastName: 'Sunny'
    // });

    this.state = {
      selectedTab: 'login',
      username: ''
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

  loginUser(name) {
    this.setState({selectedTab: 'home',
                  username: name});
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
            <HomePage username={this.state.username}/>
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
