import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'

import {HomeStack, CitiesStack, SignInStack, SignUpStack} from './Stack'
const drawer = createDrawerNavigator()

const Drawer = () => {
    return (
        <drawer.Navigator
            // screenOptions={{
            //     headerShown: false
            // }}
            >
            <drawer.Screen name="home" component={HomeStack}/>
            {/* <drawer.Screen name="header" component={Header}/>               */}
            <drawer.Screen name="cities" component={CitiesStack}/>
            {/* <drawer.Screen name="itineraries" component={Itineraries}/> */}
            <drawer.Screen name="signin" component={SignInStack}/>
            <drawer.Screen name="signup" component={SignUpStack}/>            
        </drawer.Navigator>
    )
}

export default Drawer