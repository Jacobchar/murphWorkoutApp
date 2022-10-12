import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  Alert,
  BackHandler,
  StyleSheet,
} from 'react-native';
import Timer from '../components/Timer';
import ExerciseTracker from '../components/ExerciseTracker';

import globalStyles from '../config/styles';
import {Colors} from '../config/colors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const WorkoutScreen: FC<IProps> = ({navigation}) => {
  const [firstMileDone, setFirstMileDone] = useState<boolean>(false);
  const [lastMileDone, setLastMileDone] = useState<boolean>(false);
  const [resetPage, setReset] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const createTwoButtonAlert = () =>
    // Alert for exiting the workout screen
    Alert.alert('Finish Workout', 'Are you ready to log your workout time?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          // Save the times in a new log
          navigation.navigate('ResultsPage');
        },
      },
    ]);

  // Back button handling

  console.log(time);

  // Reset Handling
  useEffect(() => {
    if (resetPage) {
      setFirstMileDone(false);
      setLastMileDone(false);
    }
  }, [resetPage]);

  return (
    // Background Image
    <ImageBackground
      style={[globalStyles.backgroundImage, {padding: 10}]}
      source={require('../assets/background.jpg')}>
      {/* Timer Component */}
      <View style={{flex: 2}}>
        <Timer setReset={setReset} setTime={setTime} />
      </View>
      {/* First Mile */}
      {!firstMileDone && (
        <TouchableOpacity
          style={[style.mileButton, {flex: 0.5}]}
          onPress={() => {
            setFirstMileDone(true);
          }}>
          <Text style={style.text}>Finish First Mile</Text>
        </TouchableOpacity>
      )}
      {firstMileDone && <Text style={style.completedText}>Completed!</Text>}
      {/* Create a button component that uses an image, an incrementor, and a total */}
      <View style={{flex: 1}}>
        <ExerciseTracker
          imageURI={require('../assets/pullup.png')}
          increment={5}
          total={100}
          reset={resetPage}
        />
      </View>
      <View style={{flex: 1}}>
        <ExerciseTracker
          imageURI={require('../assets/pushup.png')}
          increment={10}
          total={200}
          reset={resetPage}
        />
      </View>
      <View style={{flex: 1}}>
        <ExerciseTracker
          imageURI={require('../assets/squat.png')}
          increment={15}
          total={300}
          reset={resetPage}
        />
      </View>
      {/* Last Mile */}
      {/* Finish Workout Button */}
      {!lastMileDone && (
        <TouchableOpacity
          style={[style.mileButton, {flex: 0.5}]}
          onPress={() => {
            setLastMileDone(true);
            createTwoButtonAlert();
          }}>
          <Text style={style.text}>Finish Last Mile</Text>
        </TouchableOpacity>
      )}
      {lastMileDone && <Text style={style.completedText}>Completed!</Text>}
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  threeElementContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.WHITE,
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    padding: 10,
    justifyContent: 'space-between',
  },
  workoutImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mileButton: {
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.BLACK,
    backgroundColor: 'silver',
    elevation: 3,
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: 'sans serif medium',
    fontSize: 30,
    alignSelf: 'center',
  },
  completedText: {
    flex: 0.5,
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: 'sans serif medium',
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default WorkoutScreen;
