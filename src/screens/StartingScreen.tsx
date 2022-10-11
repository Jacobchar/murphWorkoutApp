import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {ImageBackground, TouchableOpacity, Text, View} from 'react-native';

import globalStyles from '../config/styles';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const StartingScreen: FC<IProps> = ({navigation}) => {
  const [recordingWorkout, setRecordingWorkout] = useState<boolean>(false);
  const [viewingHistory, setViewingHistory] = useState<boolean>(false);

  const toggleRecording = () => {
    setRecordingWorkout(!recordingWorkout);
    setViewingHistory(false);
  };
  const toggleHistory = () => {
    setViewingHistory(!viewingHistory);
    setRecordingWorkout(false);
  };

  return (
    // Background Image
    <ImageBackground
      style={[globalStyles.backgroundImage]}
      source={require('../assets/background.jpg')}>
      <View />
      {/* Start Button */}
      <TouchableOpacity
        style={[globalStyles.buttonStyle]}
        onPress={toggleRecording}>
        <Text style={globalStyles.textStyle}> Start </Text>
      </TouchableOpacity>
      {/* History Button */}
      <TouchableOpacity
        style={[globalStyles.buttonStyle]}
        onPress={toggleHistory}>
        <Text style={globalStyles.textStyle}> History </Text>
      </TouchableOpacity>
      <View />
    </ImageBackground>
  );
};

export default StartingScreen;
