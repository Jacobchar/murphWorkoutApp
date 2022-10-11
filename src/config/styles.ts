import {StyleSheet} from 'react-native';
import {Colors} from './colors';

const globalStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonStyle: {
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.BACKGROUND,
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 3,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 70,
    marginBottom: 70,
    paddingTop: 30,
    paddingBottom: 30,
  },
  timerButtonStyle: {
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.BACKGROUND,
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 3,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textStyle: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'sans serif medium',
  },
  titleStyle: {
    textAlign: 'center',
    color: Colors.BACKGROUND,
    paddingTop: 50,
    fontFamily: 'sans serif medium',
    fontSize: 58,
    fontWeight: 'bold',
    textShadowColor: 'grey',
    textShadowRadius: 50,
  },
  subTextStyle: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 14,
  },
  startingScreenButtonView: {
    flex: 3,
    justifyContent: 'space-around',
  },
});

export default globalStyles;
