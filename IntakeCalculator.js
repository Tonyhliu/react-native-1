import React, { Component, PropTypes } from 'react';
import { View,
        Text,
        Image,
        TouchableHighlight,
        // TextInput,
        // Navigator,
        Alert,
        PickerIOS,
        TouchableWithoutFeedback,
        Slider,
        Modal,
        ScrollView,
        StyleSheet
       } from 'react-native';

import { Button, CheckBox, Icon} from 'react-native-elements';

var PickerItemIOS = PickerIOS.Item;

var ACTIVITY_LEVELS = {
  none: {
    name: 'NONE'
  },
  low: {
    name: 'LOW (0-30 minutes)'
  },
  medium: {
    name: 'MED (30-60 minutes)'
  },
  high: {
    name: 'HIGH (60+ minutes)'
  }
};

export default class IntakeCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      amount: null,
      activity: 'none',
      weight: 90,
      age: 13,
      femaleChecked: false,
      maleChecked: false,
      genderModalVisible: false,
      weightModalVisible: false,
      disclaimerModalVisible: false,
      ageModalVisible: false,
      activityModalVisible: false
    };
  }

  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onForward: PropTypes.func.isRequired,
  //   onBack: PropTypes.func.isRequired,
  // }

  setGenderModal(visible) {
    this.setState({ genderModalVisible: visible});
  }

  setWeightModal(visible) {
    this.setState({ weightModalVisible: visible});
  }

  setDisclaimerModal(visible) {
    this.setState({ disclaimerModalVisible: visible});
  }

  setAgeModal(visible) {
    this.setState({ ageModalVisible: visible});
  }

  setActivityModal(visible) {
    this.setState({ activityModalVisible: visible});
  }

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

  render() {
    let activity = ACTIVITY_LEVELS[this.state.activity];
    let selectionString = activity.name;
    let years = ' yrs';
    if (this.state.age >= 65) {
      years = '+ yrs';
    }

    return (
      <ScrollView style={styles.mainContainer}>

        <View style={styles.firstContainer}>
          <View style={{marginTop: 22}}>
            <Modal
              animationType={"fade"}
              transparent={true}
              visible={this.state.disclaimerModalVisible}
              onRequestClose={() => {alert("Modal has been closed.");}}>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(34, 34, 34, 0.50)'}}>
             <View style={{backgroundColor: 'white', height: 275}}>
                <Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10}}>DISCLAIMER</Text>
                <Text style={{textAlign: 'center', marginBottom: 10}}>
                Results provides an estimate of quantity of water intake needed per day based on weight & activity level and is not intended to give precise amounts.
                </Text>
                <Text style={{textAlign: 'center', marginBottom: 10}}>
                  Also, note that 80% of estimated amount is met by consuming water and beverages, while the other 20% is derived from foods consumed.
                </Text>

                <Button title='CLOSE'
                        onPress={() => {
                          this.setDisclaimerModal(!this.state.disclaimerModalVisible);
                        }} />
              </View>
             </View>
            </Modal>
          </View>

          <View style={styles.messageBox}>
            <Text style={styles.messageBoxTitle}>
              {'How much water should you drink?'.toUpperCase()}
            </Text>
            <Text style={styles.messageBoxBodyText}>{'Determine how much water you need using the calculator below'.toUpperCase()}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <Text style={styles.disclaimerTxt}>DISCLAIMER</Text>
              <Icon
                name='info-outline'
                size={12}
                color='white'
                iconStyle={{marginLeft: 5}}
                onPress={() => {this.setDisclaimerModal(true);}}
                />
            </View>
          </View>
        </View>

        <View style={styles.attributesContainer}>
          <View style={styles.genderContainer}>
            <View style={{marginTop: 22}}>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.genderModalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}>
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(34, 34, 34, 0.50)'}}>
               <View style={{backgroundColor: 'white', height: 275}}>
                  <Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10}}>GENDER</Text>
                  <Text style={{textAlign: 'center', marginBottom: 10}}>Generally, an adult male needs more water per day compared to an adult female due to higher producing sweat glands. In turn, generally an adult male needs 3 liters per day while an adult female needs about 2.2 liters per day. Some of this water will be through the foods you eat. </Text>
                  <Text style={{textAlign: 'center', marginBottom: 10}}>Also, pregnant or breastfeeding women tend to require slightly more water than usual.</Text>

                    <Button title='CLOSE'
                            onPress={() => {
                              this.setGenderModal(!this.state.genderModalVisible);
                            }} />
                </View>
               </View>
              </Modal>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.bwd}>
                GENDER
              </Text>
              <Icon
                name='info-outline'
                size={16}
                color='#bebfc2'
                iconStyle={{marginLeft: 5, paddingBottom: 10}}
                onPress={() => {this.setGenderModal(true);}}
                />
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <CheckBox center
                        title='Male'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.maleChecked}
                        onPress={() => this.setState({femaleChecked: false, maleChecked: true})}
                        checkedColor="#ffc123"
              />
              <CheckBox center
                        title='Female'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.femaleChecked}
                        onPress={() => this.setState({femaleChecked: true, maleChecked: false})}
                        checkedColor="#ffc123"
              />
            </View>
          </View>

          <View style={styles.weightContainer}>
            <View style={{marginTop: 22}}>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.weightModalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}
                >
               <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(34, 34, 34, 0.50)'}}>
                <View style={{backgroundColor: 'white', height: 250}}>
                  <Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10}}>WEIGHT</Text>
                  <Text style={{textAlign: 'center', marginBottom: 10}}>
                    Weight combined with Height provides us with your Body Mass Index or BMI.
                    BMI is used in our calculation to factor in the surface area of your skin.
                    The more surface area you have the greater amount of sweat you produce.
                    Formula: weight / [height]^2
                  </Text>
                    <Button title='CLOSE'
                            onPress={() => {
                              this.setWeightModal(!this.state.weightModalVisible);
                            }} />
                </View>
               </View>
              </Modal>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.bwd}>WEIGHT</Text>
              <Icon
                name='info-outline'
                size={16}
                color='#bebfc2'
                iconStyle={{marginLeft: 5, paddingBottom: 10}}
                onPress={() => {this.setWeightModal(true);}} />
            </View>

            <Text style={styles.text}>
              {this.state.weight} pounds
            </Text>
            <Slider {...this.props}
                    minimumValue={90}
                    maximumValue={250}
                    step={1}
                    style={styles.sliderBar}
                    minimumTrackTintColor="#ffc123"
                    onValueChange={(val) => this.setState({weight: val})} />
            </View>

          <View style={styles.ageContainer}>
            <View style={{marginTop: 22}}>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.ageModalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}
                >
               <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(34, 34, 34, 0.50)'}}>
                <View style={{backgroundColor: 'white', height: 250}}>
                  <Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10}}>AGE</Text>
                  <Text style={{textAlign: 'center', marginBottom: 10}}>
                    Age affects how the human body uses water! As people age, thirst becomes a less effective indicator of the body's fluid needs.
                    Also, as people age, their kidney is not able to conserve water as well.
                  </Text>
                  <Text style={{textAlign: 'center', marginBottom: 10}}>
                    Moral of the story, drink water even when you don't "feel" thirsty!
                  </Text>

                    <Button title='CLOSE'
                            onPress={() => {
                              this.setAgeModal(!this.state.ageModalVisible);
                            }} />
                </View>
               </View>
              </Modal>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.bwd}>AGE</Text>
              <Icon
                name='info-outline'
                color='#bebfc2'
                size={16}
                iconStyle={{marginLeft: 5, paddingBottom: 10}}
                onPress={() => {this.setAgeModal(true);}}
                />
            </View>

            <Text style={styles.text}>
              {this.state.age}{years}
            </Text>
            <Slider {...this.props}
                    minimumValue={13}
                    maximumValue={65}
                    step={1}
                    style={styles.sliderBar}
                    minimumTrackTintColor="#ffc123"
                    onValueChange={(val) => this.setState({age: val})} />
          </View>

          <View style={styles.activityContainer}>
            <View style={{marginTop: 22}}>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.activityModalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}>
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(34, 34, 34, 0.50)'}}>
               <View style={{backgroundColor: 'white', height: 275}}>
                  <Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10}}>ACTIVITY LEVELS FOR THE DAY</Text>
                  <Text style={{textAlign: 'center', marginBottom: 10}}>Finally you will want to adjust that number
                   based on how often you work out, since you are expelling water
                   when you sweat.</Text>
                  <Text style={{textAlign: 'center', marginBottom: 10}}>You should add 12 ounces of water to your daily
                  total for every 30 minutes that you work out. So if you work out
                  for 45 minutes daily, you would add 18 ounces of water to your daily intake.</Text>

                    <Button title='CLOSE'
                            onPress={() => {
                              this.setActivityModal(!this.state.activityModalVisible);
                            }} />
                </View>
               </View>
              </Modal>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.bwd}>ACTIVITY LEVEL</Text>
              <Icon
                name='info-outline'
                size={16}
                color='#bebfc2'
                iconStyle={{marginLeft: 5, paddingBottom: 10}}
                onPress={() => {this.setActivityModal(true);}}
                />
            </View>

            <View style={{height: 200, width: 200}}>
              <PickerIOS
                selectedValue={this.state.activity}
                onValueChange={(level) => this.setState({activity: level})}>
                {Object.keys(ACTIVITY_LEVELS).map((lvl) => (
                  <PickerItemIOS
                    key={lvl}
                    value={lvl}
                    label={ACTIVITY_LEVELS[lvl].name}
                    />
                ))}
              </PickerIOS>
            </View>
          </View>

          <View style={styles.HeightContainer}>

          </View>

        </View>

      </ScrollView>
    );
  }
}

// <Text style={styles.text}>You selected: {selectionString}</Text>
// <View style={styles.quarterHeight}>
//   <Text style={styles.green}>
//     {this.state.amount === null ? '' : this.state.amount + " " + "ounces of water a day"}
//     {"\n"}
//     {this.state.amount === null ? '' : "OR"}
//     {"\n"}
//     {this.state.amount === null ? '' : Math.round(this.state.amount * 28.35) + " " + "ml of water a day"}
//   </Text>
// </View>

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bwd: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14
  },
  disclaimerTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10
  },
  firstContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  attributesContainer: {
    flex: 1,
    alignItems: 'center',
  },
  genderContainer: {
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center'
  },
  weightContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  ageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  heightContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  slider: {
    height: 10,
    margin: 10,
  },
  sliderBar: {
    width: 200
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    color: '#62a1cc'
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
    backgroundColor:'#62a1cc',
    // backgroundColor:'#fff',
    paddingTop:15,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10,
    width: 300,
    marginTop: 5
  },
  messageBoxTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffc123',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Menlo'
  },
  messageBoxBodyText:{
      color: '#fff',
      fontSize:14,
      textAlign: 'center',
      fontFamily: 'Menlo'
  }
});

// https://www.youtube.com/watch?v=zCheAcpFkL8
