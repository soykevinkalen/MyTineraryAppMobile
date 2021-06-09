import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Itineraries from '../components/Itineraries';
import Cities from '../screens/Cities';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Header from '../components/Header'

const stack = createStackNavigator()

export const HomeStack = (props) => {
    return(
        <stack.Navigator screenOptions={{
            title: <Header navigation={props.navigation}/>,
            headerStyle: { backgroundColor: 'black', height: 80 },
            headerTintColor: 'white'
        }}>
            <stack.Screen name="home" component={Home} options={{
                headerTitleContainerStyle: {width: "100%", alignItems:"center"},
            }}/>             
            <stack.Screen name="cities" component={Cities} options={{
                headerTitleContainerStyle: {width: "100%", alignItems:"flex-start"}
            }}/>
            <stack.Screen name="itineraries" component={Itineraries} options={{
                headerTitleContainerStyle: {width: "100%", alignItems:"flex-start"}
            }}/>             

        </stack.Navigator>
    ) 
}

export const CitiesStack = (props) => {
    return (
        <stack.Navigator screenOptions={{
            title: <Header navigation={props.navigation}/>,
            headerStyle: { backgroundColor: 'black', height: 80 },
            headerTintColor: 'white'
        }}>
            <stack.Screen name="cities" component={Cities} options={{
                headerTitleContainerStyle: {width: "100%", alignItems:"center", justifyContent:'space-around'}
            }}/>
            <stack.Screen name="itineraries" component={Itineraries}  options={{
                headerTitleContainerStyle: {width: "100%", alignItems:"flex-start"}
            }}/>             
        </stack.Navigator>
    )
}

export const SignInStack = (props) => {
    return (
        <stack.Navigator screenOptions={{
            title: <Header navigation={props.navigation}/>,
            headerStyle: { backgroundColor: 'black', height: 80 },
            headerTintColor: 'white'
        }}>
            <stack.Screen name="signin" component={SignIn} options={{
                headerTitleContainerStyle: {width: "100%", alignItems:"center", justifyContent:'space-around'}
            }}/>            
        </stack.Navigator>
    )
}

export const SignUpStack = (props) => {
    return (
        <stack.Navigator screenOptions={{
            title: <Header navigation={props.navigation}/>,
            headerStyle: { backgroundColor: 'black', height: 80 },
            headerTintColor: 'white'
        }}>
            <stack.Screen name="signup" component={SignUp} options={{
                headerTitleContainerStyle: {width: "100%", alignItems:"center", justifyContent:'space-around'}
            }}/>            
        </stack.Navigator>
    )
}