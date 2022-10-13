import React, {FC, SetStateAction, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Colors} from '../config/colors';

interface props {
  imageURI: typeof require;
  increment: number;
  total: number;
  setWorkoutDone: React.Dispatch<SetStateAction<boolean>>;
  workoutDone: boolean;
  reset: boolean;
}

const ExerciseTracker: FC<props> = props => {
  const [accumulatedWorkout, setAccumulatedWorkout] = useState<number>(0);

  const incrementWorkout = () => {
    // If we are not yet at our total, increment the workout
    if (accumulatedWorkout < props.total) {
      setAccumulatedWorkout(accumulatedWorkout + props.increment);
    }
  };

  useEffect(() => {
    if (accumulatedWorkout == props.total) {
      props.setWorkoutDone(true);
    }
  }, [accumulatedWorkout]);

  useEffect(() => {
    if (props.reset) {
      setAccumulatedWorkout(0);
      props.setWorkoutDone(false);
    }
  }, [props.reset]);

  return (
    <View style={style.container}>
      {!props.workoutDone && (
        <View style={style.threeElementContainer}>
          <Image
            style={style.workoutImage}
            source={props.imageURI}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={[style.incrementButton, {backgroundColor: Colors.GREY}]}
            onPress={() => {
              incrementWorkout();
            }}>
            <Text style={[style.text, {fontSize: 40}]}>+{props.increment}</Text>
          </TouchableOpacity>

          <Text style={style.text}>
            {accumulatedWorkout}/{props.total}
          </Text>
        </View>
      )}
      {props.workoutDone && (
        <View style={style.threeElementContainer}>
          <Image
            style={style.workoutImage}
            source={props.imageURI}
            resizeMode="contain"
          />
          <Text style={style.completedText}>Completed!</Text>
        </View>
      )}
    </View>
  );
};

export default ExerciseTracker;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
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
    justifyContent: 'space-between',
  },
  workoutImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  incrementButton: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.BLACK,
    backgroundColor: Colors.GREY,
    elevation: 3,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: 'sans serif medium',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  completedText: {
    flex: 2,
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: 'sans serif medium',
    fontSize: 45,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
