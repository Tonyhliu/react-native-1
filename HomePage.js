import React, { Component, PropTypes } from 'react';
import { View,
        Text,
        TouchableHighlight,
        TouchableOpacity,
        StyleSheet,
        ScrollView,
        Image,
        AlertIOS,
        Alert,
        Linking
       } from 'react-native';
import MyAppText from './MyAppText';
import { Button,

        } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Exponent from 'exponent';
import TabNavigator from 'react-native-tab-navigator';
// import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HomePage extends Component {
  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);

    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      duration: 0.0,
      currentTime: 0.0,
      controls: false,
      paused: true
    }
  }

  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
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


    return (
      <ScrollView style={styles.scrollV}>
        <View style={styles.firstContainer}>
          <View style={styles.messageBox}>
            <View>
              <Text style={styles.messageBoxTitleText}>{'Why is drinking water important?'.toUpperCase()}</Text>
            </View>

            <View>
              <MyAppText style={styles.messageBoxBodyText}>Did you know that humans are 50-70% water and that our blood is 90% water?
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
          <View style={{height: 400, width: 400}}>
            <TouchableOpacity style={{height: 400, width: 400}}
              onPress={() => {this.setState({paused: !this.state.paused})}}>
              <Exponent.Components.Video source={require('./test.mp4')}
                rate={this.state.rate}
                repeat={true}
                controls={this.state.controls}
                onEnd={() => { Alert.alert('Done!') }}
                onProgress={this.onProgress}
                volume={this.state.volume}
                muted={this.state.muted}
                style={{height: 400, width: 400, backgroundColor: 'black'}}
                paused={this.state.paused}
                resizeMode="Exponent.Components.Video.RESIZE_MODE_STRETCH"/>
            </TouchableOpacity>
          </View>
          <View style={styles.controls}>
            <View style={styles.generalControls}>
              <View style={styles.rateControl}>
                {this.renderRateControl(0.5)}
                {this.renderRateControl(1.0)}
                {this.renderRateControl(2.0)}
              </View>

              <View style={styles.volumeControl}>
                {this.renderVolumeControl(0.5)}
                {this.renderVolumeControl(1)}
                {this.renderVolumeControl(1.5)}
              </View>
            </View>
          </View>

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

                <Icon.Button size={24}
                  backgroundColor="#07619b"
                  onPress={this._navigate.bind(this, 'Hello from HP')}
                  name='calculator'>
                  <Text style={{fontSize: 14, fontWeight: 'bold', fontFamily: 'Arial', color: '#fff'}}>CALCULATE</Text>
                </Icon.Button>
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
  videoStyle: {
    height: 400
  },
  fullScreen: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    flex: 1
  },
  btnStyle: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#07619b',
    borderRadius: 5
  },
// start
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});
