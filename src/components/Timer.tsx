import React, {FC, SetStateAction, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';

import {Colors} from '../config/colors';

interface props {
  setReset: React.Dispatch<SetStateAction<boolean>>;
  setTime: React.Dispatch<SetStateAction<number>>;
}

const Timer: FC<props> = props => {
  const [stopWatchRunning, setStopWatchRunning] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  const toggleStart = () => {
    setStopWatchRunning(!stopWatchRunning);
    setResetStopwatch(false);
    props.setReset(false);
  };

  const resetStopWatch = () => {
    setStopWatchRunning(false);
    setResetStopwatch(true);
    props.setReset(true);
  };

  return (
    <View style={style.container}>
      <View style={style.timer}>
        <Stopwatch
          laps
          start={stopWatchRunning}
          reset={resetStopwatch}
          options={options}
          getTime={(time: number) => {
            props.setTime(time);
          }}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity
          style={style.startResetButtons}
          onPress={() => {
            toggleStart();
            setResetStopwatch(false);
          }}>
          <Text style={style.text}>
            {' '}
            {!stopWatchRunning ? 'Start' : 'Stop'}{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.startResetButtons}
          onPress={() => {
            resetStopWatch();
          }}>
          <Text style={style.text}> Reset </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    padding: 5,
    justifyContent: 'space-between',
  },
  timer: {
    flex: 1.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  startResetButtons: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.BLACK,
    backgroundColor: 'mediumseagreen',
    elevation: 3,
    textAlign: 'center',
    margin: 15,
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
});

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: '80%',
  },
  text: {
    fontSize: 70,
    color: '#FFF',
    marginLeft: 7,
  },
};
