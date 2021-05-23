import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import {HomeStack, CitiesStack, SignInStack, SignUpStack} from './Stack'
import DrawerContent  from '../components/DrawerContent';

const drawer = createDrawerNavigator()

const Drawer = () => {
    return (
        <drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <drawer.Screen name="home" component={HomeStack}/>
            <drawer.Screen name="cities" component={CitiesStack}/>
            <drawer.Screen name="signin" component={SignInStack}/>
            <drawer.Screen name="signup" component={SignUpStack}/>            
        </drawer.Navigator>
    )
}

export default (Drawer)