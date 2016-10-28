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
import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Exponent, { Asset, Components } from 'exponent';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    this.resetVid = this.resetVid.bind(this);

    this.state = {
      currentY: 0,
      isReady: false,
      rate: 1,
      volume: 1,
      muted: false,
      duration: 0.0,
      currentTime: 0.0,
      paused: true
    }
  }

  componentWillMount() {
    this._cacheResourcesAsync();
  }

  async _cacheResourcesAsync() {
    const images = [require('./img/favicon2.png')];
    for (let image of images) {
      await Asset.fromModule(image).downloadAsync();
    }

    const videos = [require('./test.mp4')];
    for (let video of videos) {
      await Asset.fromModule(video).downloadAsync();
    }

    this.setState({isReady: true});
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

  resetVid() {
    this.setState({currentTime: 0.0, paused: true})
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

  // handleScroll(e) {
  //   if (e.nativeEvent.contentOffset.y > this.state.currentY) {
  //     this.props.downScroll();
  //     this.setState({currentY: e.nativeEvent.contentOffset.y})
  //   } else {
  //     this.props.upScroll();
  //     this.setState({currentY: e.nativeEvent.contentOffset.y})
  //   }
  // }

  render() {
    if (!this.state.isReady) {
      return <Components.AppLoading />;
    }

    // <View style={styles.secondContainer}>
    //     <View style={{height: 200, backgroundColor: '#9fc9e1'}}>
    //       <Text style={{fontSize:20}}>1) Increase Energy & Relives Fatigue</Text>
    //       <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
    //     </View>
    //
    //     <View style={{height: 200, backgroundColor: '#007fb2'}}>
    //       <Text style={{fontSize:20}}>2) Promotes Weight Loss</Text>
    //       <Image source={require('./img/favicon2.png')} style={{width: 100, height: 200}} />
    //     </View>
    //
    //     <View style={{height: 250}}>
    //       <Image style={{flex: 1}}
    //         resizeMode="contain"
    //         source={{uri: 'https://media.giphy.com/media/MooLLNeDnBxp6/giphy.gif'}}
    //         />
    //     </View>
    // </View>

    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <View style={{height: 100}}>
            <Image source={require('./img/WaterBuddyLogo.png')}
                    resizeMode="contain"
                    style={{flex: 1}} />
          </View>
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
                by the University of East London, drinking water can actually make you smarter. Watch the video below for 10 reasons on why you should stay hydrated every day!
              </MyAppText>
            </View>

          </View>
        </View>

        <View style={styles.secondConBtnContainer}>
          <View style={{height: 375, width: 400}}>
            <TouchableOpacity
              onPress={() => {this.setState({paused: !this.state.paused})}}>
              <Exponent.Components.Video source={require('./test.mp4')}
                rate={this.state.rate}
                repeat={true}
                controls={this.state.controls}
                onEnd={this.resetVid}
                onProgress={this.onProgress}
                volume={this.state.volume}
                muted={this.state.muted}
                style={{height: 375, width: 400, backgroundColor: 'white'}}
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
  mainContainer: {
    backgroundColor: '#ffffff',
    // backgroundColor: 'black',
    flex: 1,
  },
  firstContainer: {
    height: 350,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondContainer: {
    flex: 1
  },
  secondConBtnContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden'
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
  btnStyle: {
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#07619b',
    borderRadius: 5
  },
// start
  container: {
    backgroundColor: 'black',
  },
  controls: {
    // backgroundColor: "transparent",
    backgroundColor: 'black',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    // paddingBottom: 10,
    // height: 30
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
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});
