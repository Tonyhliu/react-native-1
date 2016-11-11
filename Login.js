import React, { Component } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet,
        Image
       } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import Exponent, { Asset, Components } from 'exponent';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isReady: false
    }
  }

  componentWillMount() {
    this._cacheResourcesAsync();
  }

  async _cacheResourcesAsync() {
    const images = [require('./img/backgroundImg.jpg')];
    for (let image of images) {
      await Asset.fromModule(image).downloadAsync();
    }


    this.setState({isReady: true});
  }

  async _logIn() {
  const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
    '874143415951230', {
    permissions: ['public_profile'],
  });

  if (type === 'success') {
  // Get the user's name using Facebook's Graph API
    const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}`);
    const username = (await response.json()).name
    this.props.login(username);
    }
  }

  render() {
    if (!this.state.isReady) {
      return <Components.AppLoading />;
    }

    return (
      <Image source={require('./img/backgroundImg.jpg')}
              style={styles.backgroundContainer}>
        <View style={{height: 175, paddingLeft: 20}}>
          <Image source={require('./img/WaterBuddyLogo.png')}
            resizeMode="contain"
            style={{flex: 1, width: 175}} />
        </View>

        <View style={styles.btns}>
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
            onPress={this.props.login.bind(this,'guest')}
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
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  btns: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 300,
    marginBottom: 50
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
