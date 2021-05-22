import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import Stack from './navigation/Stack'
import Drawer from './navigation/Drawer'

import { NavigationContainer } from '@react-navigation/native';
import mainReducer from './redux/reducers/mainReducer'
import thunk from 'redux-thunk'
import {connect} from "react-redux"
import authActions from './redux/actions/authActions'

const store = createStore(mainReducer, applyMiddleware(thunk));

export default function App(props) {
  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const storage = async () => {
    const user = await AsyncStorage.getItem('userLogged')
    const token = await AsyncStorage.getItem('token')
    if (!props.userLogged && token) {
      const userData = JSON.parse(user)
      const userForced = {
        token: token,
        ...userData
      }
      await props.logInForced(userForced)
    }
  }

  storage()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <Drawer />
      </NavigationContainer>
    </Provider>
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

const mapStateToProps = state =>{
  return{
    userLogged: state.userLogged
  }
}

const mapDispatchToProps = {
  logInForced : authActions.logInForced
}

connect(mapStateToProps,mapDispatchToProps)