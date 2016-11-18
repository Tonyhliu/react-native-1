import React, { Component, PropTypes } from 'react';
import { View,
        Text,
        Image,
        TouchableHighlight,
        // TextInput,
        // Navigator,
        Alert,
        Picker,
        TouchableWithoutFeedback,
        Slider,
        Modal,
        ScrollView,
        StyleSheet
       } from 'react-native';

import { Button, CheckBox, Icon} from 'react-native-elements';

const Item = Picker.Item;

export default class IntakeCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      activityLevel: '',
      weight: 90,
      age: 13,
      femaleChecked: false,
      maleChecked: false,
      genderModalVisible: false,
      weightModalVisible: false,
      disclaimerModalVisible: false,
      ageModalVisible: false,
      activityModalVisible: false,
      heightModalVisible: false,
      heightFt: '5',
      heightIn: '5',
      bmi: '',
      ageChanged: false,
      weightChanged: false
    };

    this.buttonClicked = this.buttonClicked.bind(this);
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

  setHeightModal(visible) {
    this.setState({ heightModalVisible: visible});
  }

  buttonClicked() {
    // 1 kg = 2.2 lb
    // 1 in = 0.0254 meters
    let amt = this.state.weight * (1/2);
    let heightFt = parseInt(this.state.heightFt);
    let heightIn = parseInt(this.state.heightIn);
    let bmi = (this.state.weight / 2.2) / ((((heightFt * 12) + heightIn) * 0.0254) * (((heightFt * 12) + heightIn) * 0.0254));

    if (!this.state.femaleChecked && !this.state.maleChecked) {
      Alert.alert('Gender', 'Please select a gender!');
    } else if (!this.state.activityLevel) {
      Alert.alert('Activity Level', 'Please select daily activity level!');
    } else {
      switch (this.state.activityLevel) {
        case 'low':
          amt = amt + ((30 / 30) * 12);
          break;
        case 'medium':
          amt = amt + ((60 / 30) * 12);
          break;
        case 'high':
          amt = amt + ((90 / 30) * 12);
          break;
      }

      if (this.state.maleChecked) {
        // 2.5 L for men per day
        // 2L for women per day
        amt += 1;
        // water => 1 fl oz = 1 oz
        // 1L = 33.8 fl oz
        // .5 L = 16.9 fl oz
        // 1 fl oz = 0.0295735 L
      }

      if (this.state.age <= 30) {
        amt += 2;
      } else if (this.state.age <= 54) {
        amt += 1;
      } else if (this.state.age <= 65) {
        amt += 0;
      }

      this.setState({amount: amt, bmi: bmi});
      this.refs.scrollView.scrollTo({y: 1100});
    }
  }


  render() {
    let years = ' yrs';
    let results = <View></View>;
    let ageChangedColor = <Text style={styles.uncoloredText}>
                  {this.state.age}{years}
                </Text>;
    let weightChangedColor = <Text style={styles.uncoloredText}>
      {this.state.weight} pounds
    </Text>;

    if (this.state.ageChanged) {
      ageChangedColor = <Text style={styles.text}>
        {this.state.age}{years}
      </Text>;
    }
    if (this.state.weightChanged) {
      weightChangedColor = <Text style={styles.text}>
        {this.state.weight} pounds
      </Text>
    }

    if (this.state.age >= 65) {
      years = '+ yrs';
    }
    if (this.state.amount) {
      // let amt = Math.round(this.state.amount / 8),
      //     url = `./img/${amt}_glass.png`,
      //     src = require(url);
      //     <Image source={src}
      //       style={{height: 125, width: 175}}
      //       resizeMode="contain"/>
      results = <View style={styles.resultContainer}>
                  <Text style={{fontSize: 20, color: 'red'}}>
                    Drink {Math.round(this.state.amount)} ounces of water per day...
                  </Text>
                  <Text style={{fontSize: 20, color: 'red'}}>
                    OR approximately {Math.round(Math.round(this.state.amount) / 8)} 8-oz glasses of water
                  </Text>
                  <Text style={{fontSize: 20, color: 'green'}}>
                    BMI : {Math.round(this.state.bmi)}
                  </Text>
                  <Text style={{fontSize: 20, color: 'green'}}>
                    BMI Categories:
                  </Text>
                  <Text style={{fontSize: 20, color: 'green'}}>
                    Underweight = less than 18.5
                  </Text>
                  <Text style={{fontSize: 20, color: 'green'}}>
                    Normal weight = 18.5–24.9
                  </Text>
                  <Text style={{fontSize: 20, color: 'green'}}>
                    Overweight = 25–29.9
                  </Text>
                  <Text style={{fontSize: 20, color: 'green'}}>
                    Obesity = BMI of 30 or greater
                  </Text>
                </View>;
    }

    return (
      <ScrollView style={styles.mainContainer}
                  ref="scrollView">

        <View style={styles.firstContainer}>
          <View style={{marginTop: 22}}>
            <Modal
              animationType={"fade"}
              transparent={true}
              visible={this.state.disclaimerModalVisible}
              onRequestClose={() => {alert("Modal has been closed.");}}>
            <View style={styles.modalView}>
             <View style={{backgroundColor: '#f1fbfd', height: 275}}>
                <Text style={styles.modalHeader}>DISCLAIMER</Text>
                <Text style={styles.modalBody}>
                Results provides an estimate of quantity of water intake needed per day based on weight and activity level and is not intended to give precise amounts.
                </Text>
                <Text style={styles.modalBody}>
                  Note that 80% of estimated amount is met by consuming water and beverages, while the other 20% is derived from foods consumed.
                </Text>

                <Button title='CLOSE'
                        buttonStyle={styles.modalCloseBtn}
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
              <View style={styles.modalView}>
               <View style={{backgroundColor: 'white', height: 220}}>
                  <Text style={styles.modalHeader}>GENDER</Text>
                  <Text style={styles.modalBody}>Generally, an adult male needs more water per day compared to an adult female due to higher producing sweat glands. Pregnant or breastfeeding women tend to require slightly more water than usual as well.</Text>

                    <Button title='CLOSE'
                            buttonStyle={styles.modalCloseBtn}
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

          <View style={styles.centerContainer}>
            <View style={{marginTop: 22}}>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.weightModalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}
                >
               <View style={styles.modalView}>
                <View style={{backgroundColor: 'white', height: 250}}>
                  <Text style={styles.modalHeader}>WEIGHT</Text>
                  <Text style={styles.modalBody}>
                    Weight combined with Height provides us with your Body Mass Index or BMI.
                    BMI is used in our calculation to factor in the surface area of your skin.
                    The more surface area you have the greater amount of sweat you produce.
                  </Text>
                  <Text style={styles.modalBody}>
                    Formula: weight / [height]^2
                  </Text>
                    <Button title='CLOSE'
                            buttonStyle={styles.modalCloseBtn}
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

            <View>
              {weightChangedColor}
            </View>
            <Slider {...this.props}
                    minimumValue={90}
                    maximumValue={250}
                    step={1}
                    style={styles.sliderBar}
                    minimumTrackTintColor="#ffc123"
                    onValueChange={(val) => this.setState({weight: val, weightChanged: true})} />
            </View>

          <View style={styles.centerContainer}>
            <View style={{marginTop: 22}}>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.ageModalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}
                >
               <View style={styles.modalView}>
                <View style={{backgroundColor: 'white', height: 250}}>
                  <Text style={styles.modalHeader}>AGE</Text>
                  <Text style={styles.modalBody}>
                    Age affects how the human body uses water! As people age, thirst becomes a less effective indicator of the body's fluid needs.
                    Also, as people age, their kidney is not able to conserve water as well.
                  </Text>
                  <Text style={styles.modalBody}>
                    Moral of the story, drink water even when you don't "feel" thirsty!
                  </Text>

                    <Button title='CLOSE'
                            buttonStyle={styles.modalCloseBtn}
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

            <View>
              {ageChangedColor}
            </View>
            <Slider {...this.props}
                    minimumValue={13}
                    maximumValue={65}
                    step={1}
                    style={styles.sliderBar}
                    minimumTrackTintColor="#ffc123"
                    onValueChange={(val) => this.setState({age: val, ageChanged: true})} />
          </View>

          <View style={styles.centerContainer}>
            <View style={{marginTop: 22}}>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.activityModalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}>
              <View style={styles.modalView}>
               <View style={{backgroundColor: 'white', height: 275}}>
                  <Text style={styles.modalHeader}>DAILY ACTIVITY LEVEL</Text>
                  <Text style={styles.modalBody}>Finally you will want to adjust that number
                   based on how often you work out, since you are expelling water
                   when you sweat.</Text>
                 <Text style={styles.modalBody}>Calculation used : You should add 12 ounces of water to your daily
                  total for every 30 minutes that you work out. So if you work out
                  for 45 minutes daily, you would add 18 ounces of water to your daily intake.</Text>

                    <Button title='CLOSE'
                            buttonStyle={styles.modalCloseBtn}
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

            <View style={{flex: 1}}>
              <CheckBox center
                        title='None'
                        checked={this.state.activityLevel === 'none'}
                        checkdIcon='check-square-o'
                        uncheckedIcon='square-o'
                        onPress={() => this.setState({activityLevel: 'none'})}
                        checkedColor="#ffc123" />
              <CheckBox center
                        title='Low (0-30 mins)'
                        checked={this.state.activityLevel === 'low'}
                        checkdIcon='check-square-o'
                        uncheckedIcon='square-o'
                        onPress={() => this.setState({activityLevel: 'low'})}
                        checkedColor="#ffc123" />
              <CheckBox center
                        title='Med (30-60 mins)'
                        checked={this.state.activityLevel === 'medium'}
                        checkdIcon='check-square-o'
                        uncheckedIcon='square-o'
                        onPress={() => this.setState({activityLevel: 'medium'})}
                        checkedColor="#ffc123" />
              <CheckBox center
                        title='High (60+ mins)'
                        checked={this.state.activityLevel === 'high'}
                        checkdIcon='check-square-o'
                        uncheckedIcon='square-o'
                        onPress={() => this.setState({activityLevel: 'high'})}
                        checkedColor="#ffc123" />

            </View>
          </View>

          <View style={styles.HeightContainer}>
            <View style={{marginTop: 22}}>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.heightModalVisible}
                onRequestClose={() => {alert("Modal has been closed.");}}
                >
               <View style={styles.modalView}>
                <View style={{backgroundColor: 'white', height: 250}}>
                  <Text style={styles.modalHeader}>HEIGHT</Text>
                  <Text style={styles.modalBody}>
                    Weight combined with Height provides us with your Body Mass Index or BMI.
                    BMI is used in our calculation to factor in the surface area of your skin.
                    The more surface area you have the greater amount of sweat you produce.
                  </Text>
                  <Text style={styles.modalBody}>
                    Formula: weight / [height]^2
                  </Text>
                    <Button title='CLOSE'
                            buttonStyle={styles.modalCloseBtn}
                            onPress={() => {
                              this.setHeightModal(!this.state.heightModalVisible);
                            }} />
                </View>
               </View>
              </Modal>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.bwd}>
                HEIGHT
              </Text>
              <Icon
                name='info-outline'
                size={16}
                color='#bebfc2'
                iconStyle={{marginLeft: 5, paddingBottom: 10}}
                onPress={() => {this.setHeightModal(true);}}
                />
            </View>
            <View style={{width: 150, flexDirection: 'row'}}>
              <Picker selectedValue={this.state.heightFt}
                      style={{width: 70}}
                      onValueChange={(ft) => this.setState({heightFt: ft})}>
                <Picker.Item label="4 ft" value="4" />
                <Picker.Item label="5 ft" value="5" />
                <Picker.Item label="6 ft" value="6" />
              </Picker>
              <Picker selectedValue={this.state.heightIn}
                      style={{width: 80}}
                      onValueChange={(inches) => this.setState({heightIn: inches})}>
                <Picker.Item label="0 in" value="0" />
                <Picker.Item label="1 in" value="1" />
                <Picker.Item label="2 in" value="2" />
                <Picker.Item label="3 in" value="3" />
                <Picker.Item label="4 in" value="4" />
                <Picker.Item label="5 in" value="5" />
                <Picker.Item label="6 in" value="6" />
                <Picker.Item label="7 in" value="7" />
                <Picker.Item label="8 in" value="8" />
                <Picker.Item label="9 in" value="9" />
                <Picker.Item label="10 in" value="10" />
                <Picker.Item label="11 in" value="11" />
              </Picker>
            </View>
          </View>

          <View style={{height: 120, alignItems: 'center'}}>
            <Button title='CALCULATE'
                    buttonStyle={styles.calculateBtn}
                    onPress={this.buttonClicked}
                    icon={{type: 'font-awesome', name: 'calculator'}}
                    />
          </View>

          {results}
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
    // backgroundColor: '#dbf4fb'
    // backgroundColor: '#eaf7fd'
  },
  bwd: {
    color: '#4a545d',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 14
  },
  disclaimerTxt: {
    color: '#4f5456',
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
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slider: {
    height: 10,
    margin: 10,
  },
  sliderBar: {
    width: 220
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(34, 34, 34, 0.50)'
  },
  modalHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  modalBody: {
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15
  },
  modalCloseBtn: {
    height: 40,
    width: 100,
    backgroundColor: '#ffc123',
    alignSelf: 'center'
  },
  calculateBtn: {
    height: 50,
    width: 175,
    backgroundColor: '#ffc123',
    alignSelf: 'center',
    borderRadius: 4
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    color: '#62a1cc'
  },
  uncoloredText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    color: 'gray'
  },
  messageBox:{
    backgroundColor:'#62a1cc',
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
