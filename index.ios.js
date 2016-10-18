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
import { AppRegistry,
        View,
        Text,
        TextInput,
        StyleSheet
       } from 'react-native';
import Button from 'react-native-button';

class SampleTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '',
                    amount: null};
  }

  buttonClicked() {
    // console.log("Button Clicked!");
    let amount = Math.round(parseInt(this.state.text) * (2/3));
    this.setState({amount})
    // console.log(amount);
    // 1 fl ounce = 29.5735 ml

  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>WaterBuddy</Text>
        </View>
        <View>
          <Text style={styles.bwd}>Enter body weight!</Text>
          <TextInput style={styles.txtInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Ex: 120 pounds..."/>
          <Button style={styles.btn}
            styleDisabled={{color: 'red'}}
            onPress={this.buttonClicked.bind(this)}>
            Press me!
          </Button>
          <Text style={styles.green}>
          {this.state.amount === null ? '' : this.state.amount + " " + "ounces of water a day"}
          {"\n"}
          {this.state.amount === null ? '' : "or"}
          {"\n"}
          {this.state.amount === null ? '' : Math.round(this.state.amount * 28.35) + " " + "ml of water a day"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bwd: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 50
  },
  green: {
    color: '#81c04d',
  },
  blue: {
    color: '#a7d5f6',
  },
  txtInput: {
    height: 40,
    borderColor: '#a7d5f6',
    borderWidth: 1
  },
  btn: {
    fontSize: 20,
    color: '#a7d5f6'
  },
  toolbar: {
    backgroundColor: '#a7d5f6',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  mainContainer: {

  }
});

AppRegistry.registerComponent('HelloWorld', () => SampleTextInput);
