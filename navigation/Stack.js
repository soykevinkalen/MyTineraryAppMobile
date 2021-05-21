import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Itineraries from '../Components/Itineraries';
import Cities from '../Pages/Cities';
import Home from '../Pages/Home';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';

const stack = createStackNavigator()
const Stack = () => {
    return (
        <stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <stack.Screen name="home" component={Home}/>
            <stack.Screen name="cities" component={Cities}/>
            <stack.Screen name="itineraries" component={Itineraries}/>
            <stack.Screen name="signin" component={SignIn}/>
            <stack.Screen name="signup" component={SignUp}/>            
        </stack.Navigator>
    )
}

export default Stack