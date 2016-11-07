import React, { Component, PropTypes } from 'react';
import { View,
        Text,
        Image,
        TouchableHighlight,
        TextInput,
        Navigator,
        Alert,
        PickerIOS,
        TouchableWithoutFeedback,
        Slider,
        ScrollView,
        StyleSheet
       } from 'react-native';

import Button from 'react-native-button';
import dismissKeyboard from 'dismissKeyboard';

var PickerItemIOS = PickerIOS.Item;

var ACTIVITY_LEVELS = {
  none: {
    name: 'NONE'
  },
  low: {
    name: 'LOW (0-30 minutes)'
  },
  medium: {
    name: 'MEDIUM (30-60 minutes)'
  },
  high: {
    name: 'HIGH (60+ mins)'
  }
};

export default class WaterIntake extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      amount: null,
      activity: 'none',
      value: 90,
    };
  }


  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }

  buttonClicked() {
    let amount;
    let alertMsg = "Please enter a valid number!";
    if (Number.isInteger(parseInt(this.state.text)) && parseInt(this.state.text) > 0) {
      amount = Math.round(parseInt(this.state.text) * (2/3));
      this.setState({amount});
    } else {
      Alert.alert('Invalid weight', alertMsg);
    }
    // console.log(amount);
    // 1 fl ounce = 29.5735 ml
  }

  // <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
  //   <View>
  //     <TextInput style={styles.txtInput}
  //         keyboardType='numeric'
  //         onChangeText={(text) => this.setState({text})}
  //         value={this.state.text}
  //         placeholder="Ex: 120 pounds..."/>
  //   </View>
  // </TouchableWithoutFeedback>
  // <Button style={styles.btn}
  //   styleDisabled={{color: 'red'}}
  //   onPress={this.buttonClicked.bind(this)}>
  //   Press me!
  // </Button>
  render() {
    let activity = ACTIVITY_LEVELS[this.state.activity];
    let selectionString = activity.name;

    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.firstContainer}>

          <View style={styles.messageBox}>
            <Text style={{fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>
              {'How much water should you be drinking?'.toUpperCase()}
            </Text>
          </View>

          <View>
            <Text style={styles.bwd}>Enter body weight!</Text>

            <Text style={styles.text}>
              {this.state.value} pounds
            </Text>
            <Slider {...this.props}
                    minimumValue={90}
                    maximumValue={250}
                    step={1}
                    onValueChange={(value) => this.setState({value: value})} />
          </View>
        </View>


        <View>
          <Text style={{textAlign: 'center'}}>Activity level for the day:</Text>
          <Text>You selected: {selectionString}</Text>
          <PickerIOS
            selectedValue={this.state.activity}
            onValueChange={(activity) => this.setState({activity})}>
            {Object.keys(ACTIVITY_LEVELS).map((activity) => (
              <PickerItemIOS
                key={activity}
                value={activity}
                label={ACTIVITY_LEVELS[activity].name}
                />
            ))}
          </PickerIOS>
        </View>

        <View style={styles.quarterHeight}>
          <Text>*NOTE: 80% of estimated amount is met by consuming water & beverages, while the other 20% is derived from foods consumed.</Text>
          <Text>DISCLAIMER: Results provides an estimate of quantity of water intake needed per day based on weight & activity level and is not intended to give precise amounts.</Text>
          <Text style={styles.green}>
            {this.state.amount === null ? '' : this.state.amount + " " + "ounces of water a day"}
            {"\n"}
            {this.state.amount === null ? '' : "OR"}
            {"\n"}
            {this.state.amount === null ? '' : Math.round(this.state.amount * 28.35) + " " + "ml of water a day"}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // flexDirection: 'column'
  },
  bwd: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24
  },
  firstContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slider: {
    height: 10,
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
  quarterHeight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  messageBox:{
    backgroundColor:'#007fb2',
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10,
    width: 300,
  },
  messageBoxTitleText:{
      fontWeight:'bold',
      // color:'#ffc423',
      color: '#fff',
      textAlign:'center',
      fontSize:26,
      marginBottom:10,
      fontFamily: 'Menlo'
  },
  messageBoxBodyText:{
      color:'#fff',
      fontSize:12,
      fontFamily: 'Arial'
  }
});

// Activity Level: Finally you will want to adjust that number
// based on how often you work out, since you are expelling water
// when you sweat. You should add 12 ounces of water to your daily
// total for every 30 minutes that you work out. So if you work out
// for 45 minutes daily, you would add 18 ounces of water to your daily intake.

// https://www.youtube.com/watch?v=zCheAcpFkL8
