import React, { Component } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet
       } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import Exponent from 'exponent';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  _logIn() {
  const { type, token } = Exponent.Facebook.logInWithReadPermissionsAsync(
    '874143415951230', {
    permissions: ['public_profile'],
  });

  if (type === 'success') {
  // Get the user's name using Facebook's Graph API
    const response = fetch(
    `https://graph.facebook.com/me?access_token=${token}`);
    this.props._changeSelected();
    this.setState({name: response.json().name}) // await response?
  } else {
    //
  }

  }

  render() {
    return (
        <View style={{height: 400}}>
          <Text>Hello {this.state.name}</Text>
          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
            onPress={this._logIn.bind(this)}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  firstContainer: {
    height: 350,
    alignItems: 'center',
    // justifyContent: 'center'
  }
});
