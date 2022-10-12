/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import Lottie from 'lottie-react-native';
import {store} from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from './screen/ListScreen';
import DetailScreen from './screen/DetailScreen';
import HeaderNavigator from './components/HeaderNavigator';
import SplashScreen from './screen/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SpashScreen">
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={{
              header: props => <HeaderNavigator data={props} />,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              header: props => <HeaderNavigator data={props} />,
            }}
          />
          <Stack.Screen
            name="SpashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    aspectRatio: 1 / 1,
  },
});

export default App;
