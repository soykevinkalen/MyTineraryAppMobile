import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import {Icon} from 'react-native-elements'
import { Title, Drawer, } from 'react-native-paper';
import { connect } from "react-redux"
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import authActions from '../redux/actions/authActions'

const DrawerContent = (props) =>{
    return(
        <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
                <Image style={styles.picUser} source={{uri: props.user ? props.user.userImage : 'https://i.ibb.co/VYzFrtX/usuario.png'}}>
                </Image>
                <Title style={styles.name}>{props.user ? props.user.firstName + " " + props.user.lastName : null}</Title>
            </View>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section>
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
                </Drawer.Section>
                <Drawer.Section>
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
                />:<View>
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
                </View>}
                </Drawer.Section>
                </View>

            </DrawerContentScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20
    },
    picUser: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 800,

    }
})

const mapStateToProps = (state) => {
    return {
        user: state.auth.userLogged
    }
}

const mapDispatchToProps = {
    logOutUser: authActions.logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
