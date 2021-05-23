import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import {Icon} from 'react-native-elements'
import { connect } from "react-redux"
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import authActions from '../redux/actions/authActions'

export const DrawerContent = (props) => {
    console.log(props.user)
    return(
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                    <ImageBackground style={styles.picUser} source={{uri: props.user ? props.user.userImage : 'https://i.ibb.co/VYzFrtX/usuario.png'}}>
                    </ImageBackground>
                    <Text style={styles.name}>{props.user ? props.user.firstName + " " + props.user.lastName : null}</Text>
                    </View>
                </View>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        type='material-community'
                        name="home-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Home"
                    onPress={() => {props.navigation.navigate('home')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        type='material-community'
                        name="city-variant-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Cities"
                    onPress={() => {props.navigation.navigate('cities')}}
                />
                {props.user ? <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        type='material-community'
                        name="logout" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Log out"
                    onPress={() => {
                        props.logOutUser()
                        props.navigation.navigate('home')}}
                />:<>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon
                        type='material-community'
                        name="login" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign in"
                    onPress={() => {props.navigation.navigate('signin')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        type='material-community'
                        name="account-plus-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign up"
                    onPress={() => {props.navigation.navigate('signup')}}
                />
                </>}
            </DrawerContentScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {

    },
    picUser: {
        width: 100,
        height: 100
    }
})

const mapStateToProps = state => {
    return {
        user: state.auth.userLogged
    }
}

const  mapDispatchToProps = {
    logOutUser: authActions.logOutUser
}



connect(mapStateToProps, mapDispatchToProps)(DrawerContent)