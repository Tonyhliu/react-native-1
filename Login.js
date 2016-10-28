import React, { Component } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet
       } from 'react-native';
import { SocialIcon } from 'react-native-elements';


export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  _logIn() {
    // <Exponent.Facebook.logInWithReadPermissionsAsync(874143415951230) />
  // console.log("made it to log in");
  const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
    '874143415951230', {
    permissions: ['public_profile'],
  });

  if (type === 'success') {
  // Get the user's name using Facebook's Graph API
    const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  render() {
    return (
        <View>
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
