import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {FC, useState, useRef, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  Animated,
} from 'react-native';

import globalStyles from '../config/styles';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const StartingScreen: FC<IProps> = ({navigation}) => {
  return (
    // Background Image
    <ImageBackground
      style={[globalStyles.backgroundImage]}
      source={require('../assets/geometricBackground.jpg')}>
      <View style={{flex: 1}}>
        <Text style={globalStyles.titleStyle}>Murph Workout</Text>
      </View>
      <View style={globalStyles.startingScreenButtonView}>
        {/* Start Button */}
        <TouchableOpacity
          style={[globalStyles.buttonStyle]}
          onPress={() => {
            navigation.navigate('WorkoutPage');
          }}>
          <Text style={globalStyles.textStyle}> Start </Text>
        </TouchableOpacity>
        {/* History Button */}
        <TouchableOpacity
          style={[globalStyles.buttonStyle]}
          onPress={() => {
            navigation.navigate('HistoryPage');
          }}>
          <Text style={globalStyles.textStyle}> History </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}} />
    </ImageBackground>
  );
};

export default StartingScreen;
