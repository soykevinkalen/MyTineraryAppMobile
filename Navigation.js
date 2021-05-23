import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import Drawer from './navigation/Drawer'

import { NavigationContainer } from '@react-navigation/native';
import {connect} from "react-redux"
import authActions from './redux/actions/authActions'

const Navigation = (props) => {
    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    const forced = async (user) => {
        await props.logInForced(user)
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
            console.log("user forced",userForced)
            forced(userForced)
        }
    }

    storage()
    return(
        <NavigationContainer>
            <StatusBar />
            <Drawer />
        </NavigationContainer>
    )
}

const mapStateToProps = state =>{
    return{
      userLogged: state.userLogged
    }
  }
  
const mapDispatchToProps = {
    logInForced : authActions.logInForced
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation)