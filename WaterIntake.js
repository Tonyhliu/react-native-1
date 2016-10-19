import React, { Component, PropTypes } from 'react';
import { View,
        Text,
        Image,
        TouchableHighlight,
        TextInput,
        Navigator,
        StyleSheet
       } from 'react-native';
import Button from 'react-native-button';

export default class WaterIntake extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '',
                    amount: null};
  }

  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }

  buttonClicked() {
    // have check to see if number or not
    let amount = Math.round(parseInt(this.state.text) * (2/3));
    this.setState({amount})
    // console.log(amount);
    // 1 fl ounce = 29.5735 ml
  }

  _navigate(property){
    this.props.navigator.push({
      title: 'HomePage', // Matches route.name
      index: 0,
      passProps: {
        name: property
      },
      type: "back"
    })
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.toolbar}>
          <TouchableHighlight>
            <Text style={styles.toolbarBtn}
                  onPress={this._navigate.bind(this, "HELLO FROM WI PAGE")}>Back</Text>
          </TouchableHighlight>
          <Text style={styles.toolbarTitle}>WaterBuddy</Text>
          <Text style={styles.toolbarBtn}>Like</Text>
        </View>
        <View style={styles.secondContainer}>
          <View>
            <Text style={styles.bwd}>Enter body weight!</Text>
            <TextInput style={styles.txtInput}
              keyboardType='numeric'
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              placeholder="Ex: 120 pounds..."/>
            <Button style={styles.btn}
              styleDisabled={{color: 'red'}}
              onPress={this.buttonClicked.bind(this)}>
              Press me!
            </Button>
          </View>
        </View>
        <View style={styles.result}>
          <Text style={styles.green}>
          {this.state.amount === null ? '' : this.state.amount + " " + "ounces of water a day"}
          {"\n"}
          {this.state.amount === null ? '' : "OR"}
          {"\n"}
          {this.state.amount === null ? '' : Math.round(this.state.amount * 28.35) + " " + "ml of water a day"}
          </Text>
        </View>
        <View>
          <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          style={{width: 400, height: 200}} />
        </View>
      </View>
    );
  }

  // render() {
  //   return (
  //     <View>
  //       <Text>Current Scene: { this.props.title }</Text>
  //       <TouchableHighlight onPress={this.props.onForward}>
  //         <Text>Tap me to load the next scene</Text>
  //       </TouchableHighlight>
  //       <TouchableHighlight onPress={this.props.onBack}>
  //         <Text>Tap me to go back</Text>
  //       </TouchableHighlight>
  //     </View>
  //   )
  // }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  toolbar: {
    backgroundColor: '#a7d5f6',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarBtn: {
    width: 50,
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  result: {
    flexDirection: 'row',
    // flex: .25,
    justifyContent: 'center',
    backgroundColor: 'lightgray'
  },
  bwd: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 50
  },
  secondContainer: {
    // flex: .1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  green: {
    color: '#81c04d'
  },
  blue: {
    color: '#a7d5f6',
  },
  txtInput: {
    height: 40,
    borderColor: '#a7d5f6',
    borderWidth: 1
  },
  btn: {
    fontSize: 20,
    color: '#a7d5f6'
  }
});

// AppRegistry.registerComponent('HelloWorld', () => WaterIntake);
