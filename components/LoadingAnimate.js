import {StyleSheet, useColorScheme, View} from 'react-native';
import Lottie from 'lottie-react-native';

const LoadingAnimate = () => {
  const dark = useColorScheme() === 'dark';

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
    width: 150,
    aspectRatio: 1 / 1,
  },
});

export default LoadingAnimate;
