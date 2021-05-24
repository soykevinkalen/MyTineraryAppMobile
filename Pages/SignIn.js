
import React, { useState } from 'react';
import {Icon} from 'react-native-elements'

import {connect} from "react-redux"
import authActions from '../redux/actions/authActions'

// import GoogleLogin from 'react-google-login'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import {NavLink} from 'react-router-dom'
// import GoogleButton from 'react-google-button'
import {StyleSheet, ImageBackground, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'

const SignIn = (props) => {
    const [user, setUser] = useState({email: '', password: ''})
    const [eye, setEye] = useState(true)
    // useEffect (() =>{
    //     window.scrollTo(0,0)
    // }, [])
    const readInputUser = (e, campo) => {
        setUser({
          ...user,
          [campo]: e
        })
    }

    const sendValueUser = async () => {
        // e && e.preventDefault()
        // let userGen = e ? user : googleUser
        if(Object.values(user).some(value => value === "")){
            // return toast.error('Fill in the fields')
            // Toast.show({
            //     type: 'error',
            //     position: 'top',
            //     text1: 'Fill in the fields',
            //     visibilityTime: 3000,
            //     autoHide: true
            // })
            // return <Toast ref={(ref) => Toast.setRef(ref)} />
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
                // toast.error(response)
                ToastAndroid.showWithGravityAndOffset(
                    response,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }else{
                setUser({email: '', password: ''})
                // const message = 'Welcome ' + props.user.firstName + " " + props.user.lastName
                ToastAndroid.showWithGravityAndOffset(
                    "Welcome",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                props.navigation.navigate('home')
                // toast.success('Welcome')
                // setTimeout(function(){ props.navigation.navigate('home') }, 3000);       
            }
        }
    }
    // const responseGoogle = (response) => {
    //     if(response.profileObj.email){
    //         sendValueUser(null, {email: response.profileObj.email, password: 'a'+response.profileObj.googleId})
    //     }
    // }

    return(
        <>
            <ImageBackground style={styles.background} source={{uri:"https://i.ibb.co/cQLgmDh/northern-lights-1197755-1920.jpg"}}>
                {/* <div> */}
                    {/* <FlightTakeoffIcon className='logoForm'/> */}
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
                        {/* <input type="text" placeholder="Enter your email adress"
                        onChange={readInputUser} value={user.email} name="email" /> */}
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
                                    // color={color}
                                    size={40}
                                    onPress={()=> setEye(!eye)}
                                    color='white'

                                />
                            </View>
                            
                        </View>
                        {/* <div> */}
                            {/* <input type= "password" eye ? "text" : "password"  placeholder="Please, enter your password" */}
                            {/* onChange={readInputUser} value={user.password} name="password" /> */}
                            {/* {eye ? <VisibilityOffOutlinedIcon className='eyeSignUp' onClick={()=>setEye(!eye)} /> : <VisibilityOutlinedIcon className='eyeSignUp' onClick={()=>setEye(!eye)}/>} */}
                        {/* </div> */}
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={sendValueUser}>
                            <Text style={{color:'white'}}>Sign in!</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Don't have an account? <Text style={{fontWeight: 'bold'}} onPress={()=>props.navigation.navigate('signup')}>Sign up!</Text></Text>
                    </View>
                    
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
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
          // textDecorationLine: 'underline',
          marginTop: 10,
          fontWeight: 'bold',
        //   backgroundColor: "#aeafafab",
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
