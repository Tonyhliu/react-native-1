/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// export default class HelloWorld extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput } from 'react-native';
import Button from 'react-native-button';

class SampleTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Placeholder',
                    amount: null};
  }

  buttonClicked() {
    // console.log("Button Clicked!");
    let amount = parseInt(this.state.text) / 2;
    this.setState({amount})
    // console.log(amount);

  }

  render() {
    return (
      <View>
        <Text>Enter body weight!</Text>
        <TextInput
          style={{height: 40, borderColor: 'green', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>
        <Button style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={this.buttonClicked.bind(this)}>
          Press me!
        </Button>
        <Text>
        {this.state.amount === null ? '' : this.state.amount + "ounces of water a day"}
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('HelloWorld', () => SampleTextInput);

// import React, { Component } from 'react';
// import { AppRegistry, Text, View } from 'react-native';
//
// class Blink extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {showText: true};
//
//     // Toggle the state every second
//     setInterval(() => {
//       this.setState({ showText: !this.state.showText });
//     }, 1000);
//   }
//
//   render() {
//     let display = this.state.showText ? this.props.text : ' ';
//     return (
//       <Text>{display}</Text>
//     );
//   }
// }
//
// class BlinkApp extends Component {
//   render() {
//     return (
//       <View>
//         <Blink text='I love to blink' />
//         <Blink text='Yes blinking is so great' />
//         <Blink text='Why did they ever take this out of HTML' />
//         <Blink text='Look at me look at me look at me' />
//       </View>
//     );
//   }
// }
//
// AppRegistry.registerComponent('HelloWorld', () => BlinkApp);
