import React, { Component, PropTypes } from 'react';
import { View,
        Text,
        TouchableHighlight,
        StyleSheet,
        ScrollView,
        Image,
        WebView
       } from 'react-native';
// import Markdown from 'react-native-simple-markdown';
// import Video from 'react-native-video';
// import WaterIntake from './WaterIntake';

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
    // <Text>{this.props.title}</Text>
    return (
      <ScrollView style={{marginTop: 70}}>
        <View>
          <Image style={{flex: 1, height: 250}}
            resizeMode="contain"
            source={{uri: 'https://media.giphy.com/media/MooLLNeDnBxp6/giphy.gif'}}
            />

          <TouchableHighlight style={styles.button}
            onPress={this._navigate.bind(this, 'Hello from HP')}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableHighlight>

          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#ffc423', textAlign: 'center'}}>{'Why is drinking water important?'.toUpperCase()}</Text>
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
// <Video source={{uri: "https://www.youtube.com/watch?v=9iMGFqMmUFs"}}
//   rate={1.0}
//   volume={1.0}
//   muted={false}
//   paused={false}
//   resizeMode="cover"
//   repeat={true}
//   playInBackground={false}
//   playWhenInactive={false}
//   progressUpdateInterval={250.0}
//   onLoadStart={this.loadStart}
//   onLoad={this.setDuration}
//   onProgress={this.setTime}
//   onEnd={this.onEnd}
//   onError={this.videoError}
//   style={styles.backgroundVideo} />

//https://www.youtube.com/watch?v=9iMGFqMmUFs



const styles = StyleSheet.create({
  // toolbar: {
  //   backgroundColor: '#a7d5f6',
  //   paddingTop: 30,
  //   paddingBottom: 10,
  //   flexDirection: 'row'
  // },
  // toolbarBtn: {
  //   width: 50,
  //   color: '#fff',
  //   textAlign: 'center'
  // },
  // toolbarTitle: {
  //   flex: 1,
  //   textAlign: 'center',
  //   color: '#fff',
  //   fontWeight: 'bold'
  // },
  image: {
    width: 200,
    height: 200,
  },
  video: {
    width: 300,
    height: 100,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonText: {
    fontSize:18
  }
});
