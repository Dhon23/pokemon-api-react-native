const {View, StyleSheet, useColorScheme} = require('react-native');
import Lottie from 'lottie-react-native';
import {useEffect} from 'react';
import {StackActions} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  const dark = useColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('List'));
    }, 2000);
  }, []);

  return (
    <View
      style={[styles.container, {backgroundColor: dark ? 'black' : 'white'}]}>
      <Lottie
        source={require('../logo-animate.json')}
        autoPlay
        loop
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    aspectRatio: 1 / 1,
  },
});

export default SplashScreen;
