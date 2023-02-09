

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from './Screens/SplashScreen';
import Home from './Screens/Home'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
function App ()  {
 
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
       <NavigationContainer>
       <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />         
       </Stack.Navigator> 
       </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default (App);
