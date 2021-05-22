import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Itineraries from '../components/Itineraries';
import Cities from '../pages/Cities';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Header from '../components/Header'

const stack = createStackNavigator()

export const HomeStack = (props) => {
    return(
        <stack.Navigator screenOptions={{
            title: <Header navigation={props.navigation}/>,
            headerStyle: { backgroundColor: 'black' }
        }}>
            <stack.Screen name="home" component={Home}/>             
            <stack.Screen name="cities" component={Cities} />
            <stack.Screen name="itineraries" component={Itineraries}/>             

        </stack.Navigator>
    ) 
}

export const CitiesStack = (props) => {
    return (
        <stack.Navigator screenOptions={{
            title: <Header navigation={props.navigation}/>,
            headerStyle: { backgroundColor: 'black' }
        }}>
            <stack.Screen name="cities" component={Cities}/>
            <stack.Screen name="itineraries" component={Itineraries}/>             
        </stack.Navigator>
    )
}

export const SignInStack = (props) => {
    return (
        <stack.Navigator screenOptions={{
            title: <Header navigation={props.navigation}/>,
            headerStyle: { backgroundColor: 'black' }
        }}>
            <stack.Screen name="signin" component={SignIn}/>            
        </stack.Navigator>
    )
}

export const SignUpStack = (props) => {
    return (
        <stack.Navigator screenOptions={{
            title: <Header navigation={props.navigation}/>,
            headerStyle: { backgroundColor: 'black' }
        }}>
            <stack.Screen name="signup" component={SignUp}/>            
        </stack.Navigator>
    )
}