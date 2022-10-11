import {StyleSheet} from 'react-native';
import {Colors} from './colors';

const globalStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: Colors.LIGHTGREY,
    justifyContent: 'space-between',
  },
  buttonStyle: {
    backgroundColor: Colors.GREY,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: Colors.LIGHTGREY,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 3,
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 35,
  },
  subTextStyle: {
    color: Colors.LIGHTGREY,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default globalStyles;
