import React, { Component } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet,
        Linking
       } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/MaterialIcons';


export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View>
          <View style={styles.firstContainer}>
            <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 26,
                          fontFamily: 'Verdana',
                          textAlign: 'center',
                          fontWeight: 'bold'}}>Follow me on one of the following platforms!</Text>
            </View>
            <View style={{flex: 1}}>
              <SocialIcon type='facebook'
                          onPress={() => Linking.openURL('http://tonyhliu.us')} />
              <SocialIcon type='linkedin'
                          onPress={() => Linking.openURL('https://linkedin.com/in/tonyhoyinliu')} />
              <SocialIcon type='github'
                          onPress={() => Linking.openURL('https://github.com/tonyhliu')} />
              <SocialIcon type='instagram'
                          onPress={() => Linking.openURL('https://instagram.com/tbunzdollasign')} />
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
