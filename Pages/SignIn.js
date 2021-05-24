// import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
// import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import Toast, {DURATION} from 'react-native-easy-toast'
// import Footer from '../components/Footer'
import React, { useState } from 'react';

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
    // const [eye, setEye] = useState(false)
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
                console.log(response)
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
                    <Text style={styles.texto}>Sign in</Text>
                    <View style={styles.formulario}>
                        <TextInput 
                            placeholder="Please, enter your email adress"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'email')}
                            value={user.email}
                            keyboardType='email-address'
                        />
                        {/* <input type="text" placeholder="Please, enter your email adress"
                        onChange={readInputUser} value={user.email} name="email" /> */}
                        <TextInput 
                            secureTextEntry={true}
                            placeholder="Please, enter your password"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'password')}
                            value={user.password}
                            keyboardType='visible-password'
                            textContentType='password'
                            
                        />
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
                    </View>
                    <Text style={styles.text}>Don't have an account? <Text style={{fontWeight: 'bold'}} onPress={()=>props.navigation.navigate('signup')}>Sign up!</Text></Text>
                    
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        color: 'white',
        marginTop: 30,
        backgroundColor: "#aeafafab",

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
        backgroundColor: "#aeafafab",
    },
    formulario: {
        width: '100%',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: 60,
        borderBottomWidth: 5,
        borderBottomColor: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        textDecorationLine: 'none',
        backgroundColor: "#aeafafab",
    },
    boton: {
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 30,
        fontSize: 20,
        marginTop: 30,
        color: 'white'
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
