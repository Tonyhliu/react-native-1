import React, { Component, PropTypes } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet,
        ScrollView,
        Image,
        Linking
       } from 'react-native';
import MyAppText from './MyAppText';
import { Button } from 'react-native-elements';

export default class HomePage extends Component {
  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }

  _navigate(property) {
    this.props.navigator.push({
      title: 'WaterIntake', // Matches route.name
      index: 1,
      passProps: {
        name: property
      },
      rightText: 'Next',
    })
  }


  render() {
    // <Image style={{flex: 1, height: 250}}
    //   resizeMode="contain"
    //   source={{uri: 'https://media.giphy.com/media/MooLLNeDnBxp6/giphy.gif'}}
    //   />
    // const text = ' study '
    return (
      <ScrollView style={{marginTop: 65, flex: 1}}>
        <View style={{height: 350, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.messageBox}>
            <View>
              <Text style={styles.messageBoxTitleText}>{'Why is drinking water important?'.toUpperCase()}</Text>
            </View>

            <View>
              <MyAppText style={styles.messageBoxBodyText}>Did you know that humans are 70% water and that our blood is 90% water?
              {"\n"}
              {"\n"}
                Not only does drinking water flush out waste and bacteria, but according to a
                <MyAppText style={{color: 'blue', marginLeft: 15, marginRight: 15}}
                          onPress={() => Linking.openURL('http://www.dailymail.co.uk/health/article-2366353/How-drinking-glass-water-make-brain-14-faster.html')}> study </MyAppText>
                by the University of East London, drinking water can actually make you smarter. Below are 10 reasons why you should stay hydrated every day!
              </MyAppText>
            </View>

          </View>
        </View>

        <View style={{flex: 1}}>
          <Button title='NEXT'
                  onPress={this._navigate.bind(this, 'Hello from HP')}
                  small
                  icon={{name: 'envira', type: 'font-awesome'}} />

            <Text style={{fontSize:20}}>1) Increase Energy & Relives Fatigue</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>2) Promotes Weight Loss</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>3) Flushes out Toxins</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>4) Improves Skin Complexion</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>5) Maintains Regularity</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>6) Boosts Immune System</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>7) Natural Headache Remedy</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>8) Prevents Cramps & Sprains</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>9) Elevate Mood</Text>
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
             <Text style={{fontSize:20}}>10) Save Money!</Text>

             <TouchableHighlight style={styles.button}
                                 onPress={this._navigate.bind(this, 'Hello from HP')}>
               <Text style={styles.buttonText}>Calculator</Text>
             </TouchableHighlight>
          </View>
      </ScrollView>
    )
  }
}

//https://www.youtube.com/watch?v=9iMGFqMmUFs

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  buttonText: {
    fontSize:18
  },
  messageBox:{
    backgroundColor:'#32a5d4',
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10,
    width: 300
  },
  messageBoxTitleText:{
      fontWeight:'bold',
      color:'#ffc423',
      textAlign:'center',
      fontSize:26,
      marginBottom:10,
      fontFamily: 'Menlo'
  },
  messageBoxBodyText:{
      color:'#fff',
      fontSize:16,
  }
});
