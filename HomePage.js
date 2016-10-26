import React, { Component, PropTypes } from 'react';
import { View,
        Text,
        TouchableHighlight,
        TouchableOpacity,
        StyleSheet,
        ScrollView,
        Image,
        Linking
       } from 'react-native';
import MyAppText from './MyAppText';
import { Button,

        } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Exponent from 'exponent';
// import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HomePage extends Component {
  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }
  constructor() {
    super();
    this.state = {
      paused: true
    }
  }

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

  changeTab(selectedTab) {
    this.setState({selectedTab})
  }

  render() {
    // <Image style={{flex: 1, height: 250}}
    //   resizeMode="contain"
    //   source={{uri: 'https://media.giphy.com/media/MooLLNeDnBxp6/giphy.gif'}}
    //   />

    // const { selectedTab } = this.state

    // https://www.youtube.com/watch?v=9iMGFqMmUFs
    return (
      <ScrollView style={styles.scrollV}>
        <View style={styles.firstContainer}>
          <View style={styles.messageBox}>
            <View>
              <Text style={styles.messageBoxTitleText}>{'Why is drinking water important?'.toUpperCase()}</Text>
            </View>

            <View>
              <MyAppText style={styles.messageBoxBodyText}>Did you know that humans are 70% water and that our blood is 90% water?
              {"\n"}
              {"\n"}
                Not only does drinking water flush out waste and bacteria, but according to a
                <Text style={{color: 'blue', marginLeft: 15, marginRight: 15}}
                          onPress={() => Linking.openURL('http://www.dailymail.co.uk/health/article-2366353/How-drinking-glass-water-make-brain-14-faster.html')}> study </Text>
                by the University of East London, drinking water can actually make you smarter. Below are 10 reasons why you should stay hydrated every day!
              </MyAppText>
            </View>

          </View>
        </View>
        <View style={styles.secondConBtnContainer}>

          <TouchableOpacity style={{height: 400, width: 400}}
                            onPress={() => {this.setState({paused: !this.state.paused})}}>
            <Exponent.Components.Video source={require('./test.mp4')}
                                      style={{height: 400, width: 400}}
                                      paused={this.state.paused}
                                      resizeMode="Exponent.Components.Video.RESIZE_MODE_STRETCH"/>
          </TouchableOpacity>

          <Icon.Button size={24}
            backgroundColor="#07619b"
            onPress={this._navigate.bind(this, 'Hello from HP')}
            name='calculator'>
            <Text style={{fontSize: 14, fontWeight: 'bold', fontFamily: 'Arial', color: '#fff'}}>CALCULATE</Text>
          </Icon.Button>
        </View>

        <View style={styles.secondContainer}>
            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>1) Increase Energy & Relives Fatigue</Text>
              <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>2) Promotes Weight Loss</Text>
              <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>3) Flushes out Toxins</Text>
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>4) Improves Skin Complexion</Text>
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>5) Maintains Regularity</Text>
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>6) Boosts Immune System</Text>
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>7) Natural Headache Remedy</Text>
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>8) Prevents Cramps & Sprains</Text>
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>9) Elevate Mood</Text>
              <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
            </View>

            <View style={{height: 200}}>
              <Text style={{fontSize:20}}>10) Save Money!</Text>
              <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />

              <View>
                <Button onPress={this._navigate.bind(this, 'Hello from HP')}
                  title='NEXT'
                  small
                  buttonStyle={styles.btnStyle}
                  icon={{name: 'arrow-forward'}} />
              </View>
            </View>

          </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  buttonText: {
    fontSize:18
  },
  scrollV: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  firstContainer: {
    marginTop: 65,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondContainer: {
    flex: 1
  },
  secondConBtnContainer: {
    width: 150,
    alignSelf: 'center',
    alignItems: 'center'
  },
  messageBox:{
    backgroundColor:'#007fb2',
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
  // messageBoxBodyText:{
  //     color:'#fff',
  //     fontSize:12,
  //     fontFamily: 'Arial'
  // },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btnStyle: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#07619b',
    borderRadius: 5
  }
});
