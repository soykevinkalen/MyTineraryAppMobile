import React, { useEffect, useState } from 'react';

import axios from 'axios'
// import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
// import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import Header from '../components/Header'
// import Footer from '../components/Footer'
import {connect} from "react-redux"
import authActions from '../redux/actions/authActions'
// import GoogleLogin from 'react-google-login'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import {NavLink} from 'react-router-dom'
// import GoogleButton from 'react-google-button'
import SelectPicker from 'react-native-form-select-picker';
import { StyleSheet, ImageBackground, Text, View, TextInput, TouchableOpacity } from 'react-native'

const SignUp = (props) => { 
    const [user, setUser] = useState({firstName: '', lastName: '', email: '', password: '', userImage: '', country: ''})
    const [countries, setCountries] = useState([])
    // const [eye, setEye] = useState(false)
    const [mistakes, setMistakes] = useState({firstName: '', lastName: '', email: '', password: '', userImage: '',country: ''})
    useEffect(()=>{
        // window.scrollTo(0,0)
        axios.get('https://restcountries.eu/rest/v2/all')
        .then( response => {
            setCountries(response.data)})
        .catch(error => console.log(error))
    },[])
    const readInputUser = (e, campo) => {
        setUser({
          ...user,
          [campo]: e
        })
    }

    const sendValueUser = async () => {
        setMistakes({firstName: '', lastName: '', email: '', password: '', userImage: '',country: ''})
        // e && e.preventDefault()
        // let userGen = e ? user : googleUser
        
        if(Object.values(user).some(value => value === "")){
            // return toast.error('Fill in the fields')
            return false
        }
        const response = await props.createUser(user)
        if(response){
            if(response.controllers){
                if(response.controllers === "There was an error in the user engraving. Retry"){
                    // return toast.error(response.controllers)
                    return false
                }
                return setMistakes({'email': response.controllers})
            }
            response.map(error => setMistakes((prevState) =>{ 
                return {...prevState, [error.context.label]: error.message}
             }))
        }else{
            console.log('listo bro')
            // toast.success(`Welcome ${userGen.firstName}`)
            // setTimeout(function(){ props.history.push('/') }, 5000);
            
        }
    }
    // const responseGoogle = (response) => {
    //     const {givenName, familyName, email, googleId, imageUrl} = response.profileObj
    //     sendValueUser(null, {firstName: givenName, lastName: familyName , email, password: "a"+googleId, userImage: imageUrl, country: 'google', google: true})
    // }
    return(
        <>
            <ImageBackground style={styles.background} source={{uri:"https://i.ibb.co/Jrn97Wv/beach.jpg"}}>
                {/* <div className="form"> */}
                    {/* <FlightTakeoffIcon className='logoForm'/> */}
                    <Text style={styles.texto}>Sign up!</Text>
                    <View style={styles.formulario}>
                        <TextInput 
                            placeholder="Please, enter your first name"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'firstName')}
                        />
                        {/* <input type="text" className="input" placeholder="Please, enter your first name"
                        onChange={readInputUser} value={user.firstName} name="firstName" /> */}
                        {mistakes.firstName ? <Text>{mistakes.firstName}</Text> : null}
                        <TextInput 
                            placeholder="Please, enter your last name"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'lastName')}
                        /> 
                        {/* <input type="text" className="input" placeholder="Please, enter your last name"
                        onChange={readInputUser} value={user.lastName} name="lastName" /> */}
                        {mistakes.lastName ? <Text>{mistakes.lastName}</Text> : null} 
                        <TextInput 
                            placeholder="Please, enter your email adress"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'email')}
                        /> 
                        {/* <input type="text" className="input" placeholder="Please, enter your email adress"
                        onChange={readInputUser} value={user.email} name="email" /> */}
                        {mistakes.email ? <Text>{mistakes.email}</Text> : null} 
                        {/* <div className="password"> */}
                        <TextInput 
                            placeholder="Please, enter your password"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'password')}
                        />
                            {/* <input type= {eye ? "text" : "password"} className="input" placeholder="Please, enter your password"
                            onChange={readInputUser} value={user.password} name="password" /> */}
                            {/* {eye ? <VisibilityOffOutlinedIcon className='eyeSignUp' onClick={()=>setEye(!eye)} /> : <VisibilityOutlinedIcon className='eyeSignUp' onClick={()=>setEye(!eye)}/>} */}
                        {/* </div> */}
                            {mistakes.password ? <Text>{mistakes.password}</Text> : null} 
                        <TextInput 
                            placeholder="Please, enter the URL of your picture"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'userImage')}
                        />
                        {/* <input type="text" className="input image" placeholder="Please, enter the URL of your picture"
                        onChange={readInputUser} value={user.userImage} name="userImage" /> */}
                        {mistakes.userImage ? <Text>{mistakes.userImage}</Text> : null} 

                        <View style={[styles.input, styles.textArea]}>
                            <SelectPicker default='Choose a country' label ='country' placeholder='Choose your country' placeholderStyle={{color:'#9b9b9b'}} onValueChange={(value) => readInputUser(value,"country")}  >
                            {countries.map((country, index) =>{
                                return(
                                <SelectPicker.Item label ={country.name} value={country.name} key={country.name} >{country.name} </SelectPicker.Item>
                                )
                            })}
                            </SelectPicker>
                        </View>
                        {/* <select onChange={readInputUser} name="country" className="input">
                            <option value='random'>Choose your country</option>
                            {countries.map(country => {
                                return <option key={country.name} value={country.name}>{country.name}</option>
                            })}
                        </select> */}
                        {mistakes.country ? <Text>{mistakes.country}</Text> : null} 
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={sendValueUser}>
                            <Text>Sign up!</Text>
                        </TouchableOpacity>
                        {/* <button className="boton" onClick={sendValueUser}>Sign up!</button> */}
                        {/* <div className="input">
                            <h6>Already have an account?  <NavLink to='/signin' className="navLink sign">Sign in here!</NavLink></h6>
                            <h6>Or you can sign up with Google</h6>
                        </div> */}
                        {/* <GoogleLogin
                            clientId="974935643152-dc0ocnkdohrlv5gug0tjbf6r9t32smcb.apps.googleusercontent.com"
                            render={renderProps => (
                                <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign up with Google</GoogleButton>
                            )}
                            buttonText="Sign up with google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                    </View>
                {/* </div> */}
                {/* <ToastContainer /> */}
            </ImageBackground>
            {/* <Footer /> */}
        </>
    )
}


const styles = StyleSheet.create({
    textArea:{ 
        height: 40,
        width:"80%",
        paddingLeft:10,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        width: "100%"
    },
    texto: {
        fontSize: 30,
        color: 'white',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontWeight: 'bold'
    },
    formulario: {
        width: '100%',
        alignItems: 'center'

    },
    input: {
        width: '60%',
        height: 60,
        backgroundColor: 'red',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        textDecorationLine: 'none'
    },
    boton: {
        backgroundColor: 'yellow',
        paddingVertical: 5,
        paddingHorizontal: 30,
        fontSize: 20,
        marginTop: 30
    }
  });

const mapDispatchToProps = {
    createUser: authActions.createUser
}

export default connect(null ,mapDispatchToProps)(SignUp)