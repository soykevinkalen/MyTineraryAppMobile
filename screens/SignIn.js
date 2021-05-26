import React, { useState } from 'react'
import {Icon} from 'react-native-elements'
import {connect} from "react-redux"
import authActions from '../redux/actions/authActions'
import {StyleSheet, ImageBackground, Text, View, TextInput, TouchableOpacity, ToastAndroid, Button } from 'react-native'
import * as Google from "expo-google-app-auth";


const SignIn = (props) => {
    const [user, setUser] = useState({email: '', password: ''})
    const [eye, setEye] = useState(true)
    const readInputUser = (e, campo) => {
        setUser({
          ...user,
          [campo]: e
        })
    }

    const sendValueUser = async () => {
        if(Object.values(user).some(value => value === "")){
            ToastAndroid.showWithGravityAndOffset(
                "Fill in the fields",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return false
            
        }else{
            const response = await props.logInUser(user)
            if(response){
                ToastAndroid.showWithGravityAndOffset(
                    response,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }else{
                setUser({email: '', password: ''})
                ToastAndroid.showWithGravityAndOffset(
                    "Welcome",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                props.navigation.navigate('home')  
            }
        }
    }

    const signInAsync = async () => {
        try {
          const { type, user } = await Google.logInAsync({
            iosClientId: "974935643152-njitq8e3k3o8a2mjrrdab6ul1lbvicu4.apps.googleusercontent.com",
            androidClientId: "974935643152-mbved12rng5vjl4r2bpr0ihm3umjg2m5.apps.googleusercontent.com",
          });
    
          if (type === "success") {
            const userr = {email: user.email, password: 'a'+user.id}
            const response = await props.logInUser(userr)
            if(response){
                ToastAndroid.showWithGravityAndOffset(
                    response,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }else{
                setUser({email: '', password: ''})
                ToastAndroid.showWithGravityAndOffset(
                    `Welcome ${user.givenName + " " + user.familyName}`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                props.navigation.navigate('home')  
            }
          }
        } catch (error) {
          console.log("SignIn.js 85 | error with login", error);
        }
    };

    return(
        <>
            <ImageBackground style={styles.background} source={{uri:"https://i.ibb.co/3zczntf/pexels-efrain-alonso-3584283.jpg"}}>
                    <View style={styles.formulario}>
                        <Text style={styles.texto}>Sign in</Text>
                        <TextInput 
                            placeholder="Enter your email adress"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'email')}
                            value={user.email}
                            keyboardType='email-address'
                        />
                        <View style = {styles.inputContainer}>
                            <TextInput 
                                secureTextEntry={eye}
                                placeholder="Enter your password"
                                placeholderTextColor = 'white'
                                color = 'white'
                                style = {styles.input}
                                onChangeText={(e) => readInputUser(e, 'password')}
                                value={user.password}                            
                            />
                            <View style={styles.eyeContainer}>
                                <Icon 
                                    type='material-community'
                                    name= {eye ? "eye-off-outline" : "eye-outline"} 
                                    size={40}
                                    onPress={()=> setEye(!eye)}
                                    color='white'

                                />
                            </View>
                            
                        </View>
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={sendValueUser}>
                            <Text style={{color:'white'}}>Sign in!</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Don't have an account? <Text style={{fontWeight: 'bold'}} onPress={()=>props.navigation.navigate('signup')}>Sign up!</Text></Text>
                    
                        <Button style={styles.button} title="Login with Google" onPress={signInAsync} />
                    
                    </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    button:{
        marginVertical: 10
    },
    inputContainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row'
    },
    eyeContainer: {
        position:'absolute',
        right: 20,
        top: 20
    },
    text:{
        fontSize: 20,
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 10
    },
    background: {
      flex: 1,
      alignItems: 'center',
      width: "100%",
      justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
          color: 'white',
          marginTop: 10,
          fontWeight: 'bold',
    },
    formulario: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: 'rgba(16,16,16,0.5)',
        borderRadius:15,
    },
    input: {
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.9)',
        width: '95%',
        height: 60,
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        textDecorationLine: 'none',
    },
    boton: {
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 30,
        fontSize: 20,
        marginTop: 30,
        color: 'white',
        borderRadius: 12,
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.auth.userLogged
    }
}
const mapDispatchToProps = {
    logInUser: authActions.logInUser 
}

export default connect(mapStateToProps ,mapDispatchToProps)(SignIn)
