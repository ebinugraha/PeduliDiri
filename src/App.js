import React from 'react';
import {View, StyleSheet, Text, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';

const App = () => {

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);

  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  );

}

export default App;
