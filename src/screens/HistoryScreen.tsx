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
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../config/styles';
import {Colors} from '../config/colors';
import {timeDiff} from '../components/util/timeDiff';

interface props {
  navigation: NavigationProp<ParamListBase>;
}

const HistoryScreen: FC<props> = ({navigation}) => {
  const [historyDataList, setHistoryDataList] = useState<any[]>([]);
  const [itemDeleted, setItemDeleted] = useState<boolean>(false);
  const [dataReady, setDataReady] = useState<boolean>(false);

  const createTwoButtonAlert = (item: any[]) =>
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

  const calcDateValue = (obj: Date): number => {
    return obj.getFullYear() * 2 + obj.getMonth() * 100 + obj.getDate();
  };

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let sortedResults = Object.values(result);
      sortedResults.sort((objA, objB) => {
        return (
          calcDateValue(new Date(objB[0])) - calcDateValue(new Date(objA[0]))
        );
      });
      setHistoryDataList(sortedResults);
      setDataReady(true);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLogEntry = async (item: any[]) => {
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
    if (itemDeleted) {
      setItemDeleted(false);
      importData();
    }
  }, [itemDeleted]);

  const renderScreen = () => {
    if (dataReady && historyDataList.length != 0) {
      console.log('print damnit');
      var numEntries: number = historyDataList.length;
      console.log(numEntries);
      return (
        <View style={style.container}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.text, {alignSelf: 'flex-end'}]}>
              {' '}
              First Mile{' '}
            </Text>
            <Text style={style.text}> Total </Text>
            <Text style={[style.text, {alignSelf: 'flex-end'}]}>
              {' '}
              Last Mile{' '}
            </Text>
          </View>
          <FlatList
            data={historyDataList}
            renderItem={({item, index}) => renderItem(item, index, numEntries)}
          />
        </View>
      );
    } else if (!dataReady) {
      return (
        <View style={style.container}>
          <View>
            <ActivityIndicator size="large" />
          </View>
        </View>
      );
    } else {
      <View style={style.container}>
        <View>
          <Text style={[style.text, {textAlign: 'center'}]}>
            No Logs Available
          </Text>
        </View>
      </View>;
    }
  };
  const renderItem = (item: any[], index: number, totalEntries: number) => {
    // Increment the entry number and display our times
    let timeArray: string[] = JSON.parse(item[1]);

    // Create the inverted list index using the index of the item and the total number of entries
    var invertedIndex: number = totalEntries - index;
    return (
      <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <Text style={style.text}> {invertedIndex}. </Text>
        <Text style={style.mileText}>{timeArray[0]}</Text>
        <Text style={style.timeText}>{timeArray[2]}</Text>
        <Text style={style.mileText}>
          {timeDiff(timeArray[2], timeArray[1])}
        </Text>
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
      style={[globalStyles.backgroundImage, {flexDirection: 'column'}]}
      source={require('../assets/background.jpg')}>
      <View style={{flex: 1}}>
        <Text style={style.titleStyle}>Workout History</Text>
      </View>
      {/* History */}
      {renderScreen()}
    </ImageBackground>
  );
};

export default HistoryScreen;

const style = StyleSheet.create({
  container: {
    flex: 7,
    flexDirection: 'column',
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
    fontSize: 25,
    alignSelf: 'center',
  },
  mileText: {
    flex: 2,
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: 'sans serif medium',
    fontSize: 15,
    alignSelf: 'center',
  },
  timeText: {
    flex: 4,
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'sans serif medium',
    fontWeight: 'bold',
    fontSize: 30,
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
