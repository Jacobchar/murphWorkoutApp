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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timer from '../components/Timer';
import ExerciseTracker from '../components/ExerciseTracker';

import globalStyles from '../config/styles';
import {Colors} from '../config/colors';

// Create the array for our first mile time, second mile start time, and total time
var timeArray: number[] = [];

interface props {
  navigation: NavigationProp<ParamListBase>;
}

const WorkoutScreen: FC<props> = ({navigation}) => {
  const [firstMileDone, setFirstMileDone] = useState<boolean>(false);
  const [lastMileDone, setLastMileDone] = useState<boolean>(false);
  const [pullUpsDone, setPullUpsDone] = useState<boolean>(false);
  const [pushupsDone, setPushupsDone] = useState<boolean>(false);
  const [squatsDone, setSquatsDone] = useState<boolean>(false);
  const [resetPage, setReset] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  var dateTime: Date = new Date();

  useEffect(() => {
    setReset(false);
    // Create a new log date for the workout
    dateTime = new Date();
  }, []);

  const saveData = async () => {
    console.log('Log added!');
    console.log(dateTime.toString());
    console.log(JSON.stringify(timeArray));
    try {
      await AsyncStorage.setItem(
        dateTime.toString(),
        JSON.stringify(timeArray),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createTwoButtonAlert = () =>
    // Alert for exiting the workout screen
    Alert.alert('Finish Workout', 'Are you ready to log your workout time?', [
      {
        text: 'No',
        onPress: () => {
          setLastMileDone(false);
        },
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          // Save the finish time and store it in our log
          timeArray[2] = time;
          saveData();
          setReset(true);
          dateTime = new Date();
          navigation.navigate('HomePage');
        },
      },
    ]);

  // Back button handling

  // Reset Handling
  useEffect(() => {
    if (resetPage) {
      setFirstMileDone(false);
      setLastMileDone(false);
    }
  }, [resetPage]);

  // Store the times associated with the miles
  useEffect(() => {
    if (firstMileDone && !(pullUpsDone || pushupsDone || squatsDone)) {
      timeArray[0] = time;
    } else if (firstMileDone && pullUpsDone && pushupsDone && squatsDone) {
      timeArray[1] = time;
    }
  }, [firstMileDone, lastMileDone, pullUpsDone, pushupsDone, squatsDone]);

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
          style={style.mileButton}
          onPress={() => {
            setFirstMileDone(true);
          }}>
          <Text style={style.text}>Finish First Mile</Text>
        </TouchableOpacity>
      )}
      {firstMileDone && (
        <View style={style.mileButton}>
          <Text style={style.completedText}>Completed!</Text>
        </View>
      )}
      {/* Create a button component that uses an image, an incrementor, and a total */}
      <View style={{flex: 1}}>
        <ExerciseTracker
          imageURI={require('../assets/pullup.png')}
          increment={5}
          total={100}
          setWorkoutDone={setPullUpsDone}
          workoutDone={pullUpsDone}
          reset={resetPage}
        />
      </View>
      <View style={{flex: 1}}>
        <ExerciseTracker
          imageURI={require('../assets/pushup.png')}
          increment={10}
          total={200}
          setWorkoutDone={setPushupsDone}
          workoutDone={pushupsDone}
          reset={resetPage}
        />
      </View>
      <View style={{flex: 1}}>
        <ExerciseTracker
          imageURI={require('../assets/squat.png')}
          increment={15}
          total={300}
          setWorkoutDone={setSquatsDone}
          workoutDone={squatsDone}
          reset={resetPage}
        />
      </View>
      {/* Last Mile */}
      {/* Finish Workout Button */}
      {!lastMileDone && (
        <TouchableOpacity
          style={style.mileButton}
          onPress={() => {
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
    flex: 0.5,
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
    flex: 1,
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: 'sans serif medium',
    fontSize: 42,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default WorkoutScreen;
