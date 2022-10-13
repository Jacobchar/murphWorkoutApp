import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import globalStyles from '../config/styles';
import {Colors} from '../config/colors';
import {KeyValuePair} from '@react-native-async-storage/async-storage/lib/typescript/types';

interface props {
  navigation: NavigationProp<ParamListBase>;
}

const HistoryScreen: FC<props> = ({navigation}) => {
  const [historyList, setHistoryList] = useState<readonly KeyValuePair[]>([]);
  const [itemDeleted, setItemDeleted] = useState<boolean>(false);

  // Flat list reverse numbering
  var entryNum: number = historyList.length + 1;

  const createTwoButtonAlert = (item: KeyValuePair) =>
    // Alert for exiting the workout screen
    Alert.alert(
      'Delete Log Entry',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'No',
          onPress: () => {
            // Do nothing
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Delete the log entry
            deleteLogEntry(item);
          },
        },
      ],
    );

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      setHistoryList(result);

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLogEntry = async (item: KeyValuePair) => {
    try {
      const keys = await AsyncStorage.removeItem(item[0]);
      setItemDeleted(true);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  // Import the data on mounting
  useEffect(() => {
    importData();
  }, []);

  useEffect(() => {
    setItemDeleted(false);
    importData();
  }, [itemDeleted]);

  useEffect(() => {
    entryNum = historyList.length + 1;
  });

  const renderItem = (item: KeyValuePair) => {
    // Increment the entry number and display our times
    entryNum--;
    let timeArray: number[] = JSON.parse(item[1]);
    return (
      <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <Text style={style.text}> {entryNum}. </Text>
        {/* <Text style={style.dateText}>{ item}/{ }</Text> */}
        <Text style={style.timeText}>{timeArray[2]}</Text>
        <TouchableOpacity
          style={style.deleteButton}
          onPress={() => createTwoButtonAlert(item)}>
          <Image
            style={style.deleteImage}
            source={require('../assets/garbageCan.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    // Background Image
    <ImageBackground
      style={[globalStyles.backgroundImage]}
      source={require('../assets/background.jpg')}>
      <View style={{flex: 1}}>
        <Text style={style.titleStyle}>Workout History</Text>
      </View>
      {/* History */}
      <View style={style.container}>
        <FlatList
          data={historyList}
          renderItem={({item}) => renderItem(item)}
        />
      </View>
    </ImageBackground>
  );
};

export default HistoryScreen;

const style = StyleSheet.create({
  container: {
    flex: 7,
    flexDirection: 'row',
  },
  deleteButton: {
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
    color: Colors.WHITE,
    fontFamily: 'sans serif medium',
    fontSize: 30,
    alignSelf: 'center',
  },
  dateText: {
    flex: 1,
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: 'sans serif medium',
    fontSize: 20,
    alignSelf: 'center',
  },
  timeText: {
    flex: 4,
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'sans serif medium',
    fontSize: 40,
    alignSelf: 'center',
  },
  deleteImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    textAlign: 'center',
    color: Colors.BACKGROUND,
    paddingTop: 20,
    fontFamily: 'sans serif medium',
    fontSize: 50,
    fontWeight: 'bold',
    textShadowColor: 'grey',
    textShadowRadius: 50,
  },
});
