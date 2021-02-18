import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './Login'; 
import Main from './Main';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const LoginNavigator = () => {
    return (
   <Stack.Navigator>
       <Stack.Screen name="Login" component={Login}/>
       <Stack.Screen name="Main" component={Main} />
   </Stack.Navigator>
    );
};

export default () => {
    return (
  <NavigationContainer>
      <LoginNavigator/>
  </NavigationContainer>
    );
};