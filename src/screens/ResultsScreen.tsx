import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {ImageBackground, TouchableOpacity, Text} from 'react-native';

import globalStyles from '../config/styles';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const ResultsScreen: FC<IProps> = ({navigation}) => {
  return (
    // Background Image
    <ImageBackground
      style={[globalStyles.backgroundImage]}
      source={require('../assets/background.jpg')}>
      {/* Start Button */}
      {/* <TouchableOpacity
        style={[globalStyles.buttonStyle]}
        onPress={toggleRecording}>
        <Text style={globalStyles.textStyle}> Start </Text>
      </TouchableOpacity> */}
      {/* History Button */}
      {/* <TouchableOpacity
        style={[globalStyles.buttonStyle]}
        onPress={toggleHistory}>
        <Text style={globalStyles.textStyle}> History </Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );
};

export default ResultsScreen;
