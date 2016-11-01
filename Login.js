import React, { Component } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet,
        Image
       } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import Exponent from 'exponent';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  async _logIn() {
  const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
    '874143415951230', {
    permissions: ['public_profile'],
  });

  // console.log(this.props.changeSelected);
  // console.log(this.state.name);
  if (type === 'success') {
  // Get the user's name using Facebook's Graph API
  this.props.changeSelected();
  console.log("hello");
  // console.log(`${token}`);
  const response = await fetch(
  `https://graph.facebook.com/me?access_token=${token}`);
  await response.json.name
  if (response) {
    console.log(response.json.name);
    // console.log(response.json.name);
    this.setState({name: response.json.name}) // await response?
    }
  }
  console.log("response is: " + {response});

  }

  render() {
    return (
      <Image source={require('./img/backgroundImg.jpg')}
              style={styles.backgroundContainer}>
        <View style={styles.btns}>
          <Text style={{color: 'white'}}>Hello {this.state.name}</Text>
          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
            raised
            style={{width: 250}}
            onPress={this._logIn.bind(this)}
            />
          <Button
            buttonStyle={styles.guestBtn}
            raised
            icon={{name: 'face'}}
            onPress={this.props.changeSelected}
            title='Continue As A Guest'
            fontWeight='bold'
            fontSize={15}
            />
        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    // resizeMode: 'contain',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  btns: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 300
  },
  guestBtn: {
    borderRadius: 30,
    width: 250,
    height: 52,
    margin: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'green',
  }
});
