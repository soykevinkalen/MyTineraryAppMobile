import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from './Components/Header';
import AppLoading from 'expo-app-loading';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import Stack from './navigation/Stack'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
