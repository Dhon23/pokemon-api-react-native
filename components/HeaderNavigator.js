import {Text, useColorScheme, View} from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderNavigator = ({data}) => {
  // console.log(data.navigation.canGoBack());
  const canGoBack = data.navigation.canGoBack();
  const color = useColorScheme() === 'dark' ? 'white' : 'black';
  const backgroundColor = useColorScheme() === 'dark' ? 'black' : 'white';
  return (
    <View
      style={{
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
      }}>
      {canGoBack && (
        <Icon
          name="angle-left"
          size={50}
          color={color}
          onPress={() => data.navigation.goBack()}
          style={{marginRight: 'auto', marginLeft: 15}}
        />
      )}
      <Text
        style={{
          color,
          fontSize: 60,
          fontWeight: 'bold',
          marginRight: canGoBack ? 'auto' : 0,
        }}>
        PokeApp
      </Text>
      {!canGoBack && (
        <Lottie
          style={{width: 80, height: 80, marginLeft: 10}}
          source={require('../logo-animate.json')}
        />
      )}
    </View>
  );
};

export default HeaderNavigator;
