import React, { Component } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet,
        Image,
        ScrollView,
        Linking
       } from 'react-native';
import { SocialIcon } from 'react-native-elements';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ScrollView>
          <View style={styles.firstContainer}>
            <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 26,
                          fontFamily: 'Menlo',
                          textAlign: 'center',
                          fontWeight: 'bold'}}>FOLLOW ME!</Text>
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
          <View style={{height: 250, marginTop: 30}}>
            <Image style={{flex: 1}}
              resizeMode="contain"
              source={{uri: 'https://media.giphy.com/media/MooLLNeDnBxp6/giphy.gif'}}
              />
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
