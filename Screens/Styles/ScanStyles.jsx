import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  historyContainer: {
    paddingVertical: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon1: {
    width: 30,
    height: 30,
  },
  icon2: {
    width: 80,
    height: 80,
  },
  icon3: {
    width: 30,
    height: 30,
  },
  flipContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  flipIcon: {
    width: 30,
    height: 30,
  },
});

export default styles;
