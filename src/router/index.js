import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Splash, Home, IntroSlider, Login, Daftar, Checkin, History, AddDataPages} from '../pages';
import { BottomTabNavigator } from '../components';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={props => <BottomTabNavigator {...props}/>}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Checkin" component={Checkin} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="IntroSlider" component={IntroSlider} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Daftar" component={Daftar} />
      <Stack.Screen name="AddDataPages" component={AddDataPages} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Router;
