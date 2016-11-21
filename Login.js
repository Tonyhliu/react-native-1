import React, { Component } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet,
        Image,
        Alert,
        Modal
       } from 'react-native';
import { Button, SocialIcon, FormLabel, FormInput } from 'react-native-elements';
import Exponent, { Asset, Components } from 'exponent';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCu7-RQHAXaQEd2eUADLtccRN_nzmb3evs",
  authDomain: "waterbuddyapp-640d4.firebaseapp.com",
  databaseURL: "https://waterbuddyapp-640d4.firebaseio.com",
  storageBucket: "gs://waterbuddyapp-640d4.appspot.com",
};
firebase.initializeApp(config);


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isReady: false,
      modalVisible: false,
      email: '',
      password: '',
      loaded: ''
    }

    this.signUp = this.signUp.bind(this);
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

  setModal(boolean) {
    this.setState({ modalVisible: boolean });
  }

  signUp() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(user) {
      Alert.alert(user);
    }).catch(function(error) {
          // Handle Errors here.
          console.log("1st error: " + error);
          var errorCode = error.code;
          var errorMessage = error.message;
          if (error) {
            switch (errorCode) {
              case 'auth/weak-password':
                Alert.alert('Invalid Password', 'The password is too weak.');
                break;
              case 'auth/invalid-email':
                Alert.alert('Invalid Email', 'Email address is invalid.');
                break;
              case 'auth/email-already-in-use':
                Alert.alert('Invalid Email', 'An account already exists with given email address.');
                break;
              default:
                Alert.alert('Error', 'Error creating user');
            }
            console.log(error);
          } else {
            // else statement not being hit
            Alert.alert('Success!')
          }
        });

        this.setState({
          email: '',
          password: ''
        })
  }

  render() {
    if (!this.state.isReady) {
      return <Components.AppLoading />;
    }

    // <SocialIcon
    //   title='Sign In With Facebook'
    //   button
    //   type='facebook'
    //   raised
    //   style={{width: 250}}
    //   onPress={this._logIn.bind(this)}
    //   />

    // onpress={this.signup.bind(this)}
    // onpress={this.goToLogin.bind(this)}

    return (
      <Image source={require('./img/backgroundImg.jpg')}
              style={styles.backgroundContainer}>

        <View style={{height: 175, paddingLeft: 20}}>
          <Image source={require('./img/WaterBuddyLogo.png')}
            resizeMode="contain"
            style={{flex: 1, width: 175}} />
        </View>


        <View style={styles.btns}>
          <Button
            buttonStyle={styles.guestBtn}
            raised
            icon={{name: 'face'}}
            onPress={() => {this.setState({modalVisible: true})}}
            title='Login With Email'
            fontWeight='bold'
            fontSize={15}
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

          <View style={styles.centerContainer}>
            <View>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}>
                <View style={styles.modalView}>
                  <View style={{backgroundColor: 'white', height: 300, width: 300}}>
                      <View style={{marginBottom: 30, marginTop: 30}}>
                        <View>
                          <TouchableHighlight
                            underlayColor="white"
                            onPress={() => {
                              this.setModal(!this.state.modalVisible);
                            }}>
                            <Image style={{width: 15, height: 15, marginRight: 15, alignSelf: 'flex-end'}}
                                  source={require('./img/close.png')} />
                          </TouchableHighlight>
                        </View>

                        <FormLabel>Email</FormLabel>
                        <FormInput
                          style={{fontSize: 12}}
                          onChangeText={(text) => this.setState({email: text})}
                          value={this.state.email}
                          placeholder={"Email Address"}
                        />

                        <FormLabel>Password</FormLabel>
                        <FormInput
                          style={{fontSize: 12}}
                          onChangeText={(text) => this.setState({password: text})}
                          value={this.state.password}
                          secureTextEntry={true}
                          placeholder={"Password"}
                        />
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Button
                          buttonStyle={{height: 40, width: 120}}
                          title="Signup"
                          onPress={this.signUp}/>

                        <Button
                          buttonStyle={{height: 40, width: 120}}
                          title="Login"/>
                      </View>


                  </View>
                </View>
              </Modal>
            </View>
          </View>
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
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(34, 34, 34, 0.50)'
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
