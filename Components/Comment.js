import React, { useEffect, useState, useRef } from 'react';
import itinerariesActions from '../redux/actions/itinerariesActions'
import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';
import Header from './Header'
import { connect } from "react-redux"
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {Icon} from 'react-native-elements'


const Comment = (props) => {
    const [close, setClose] = useState(false)

    const [view, setView] = useState(false)
    const [updatedComment, setUpdatedComment] = useState('')

    const edit = (comment) =>{
        setView(!view)
        setClose(!close)
        setUpdatedComment(comment.comment)
    }
    
    const send = () => {
        if(updatedComment.trim() !== ""){
            props.comment.comment = updatedComment
            props.updateComment(props.comment)
            setView(!view)
            setClose(!close)
        }
    }
    const closeButton = () => {
        setClose(!close)
        setView(!view)
    }
    return(        
        <View style={styles.container}>
            <View style={styles.imageText}>
                <View style={styles.imageText}>
                    <Image style={styles.picUser} source={{uri:`${props.comment.userId.userImage}`}}></Image>
                    <Text style={styles.text}>{props.comment.userId.firstName + " " + props.comment.userId.lastName }</Text>
                </View>
                
            {
                (props.user && props.comment.userId.email === props.user.email) ? 
                <>
                {close ? <Icon 
                        type='material-community'
                        name='close-box'
                        size={30}
                        color = 'blue'
                        onPress={()=> closeButton()}           
                    /> : 
                <View style={styles.imageText}> 
                <Icon 
                        type='material-community'
                        name='pencil-outline'
                        size={30}
                        color = 'blue'
                        onPress = {()=> edit(props.comment)}           
                    />
                <Icon 
                        type='material-community'
                        name='delete'
                        size={30}
                        color = 'blue'
                        onPress = {() => props.deleteComment(props.comment)}           
                    />
                </View>}
                </> : null
            }

            </View>
            {!view && 
            <Text style={styles.text}>{props.comment.comment}</Text>}
            {view && (
                <View  style={styles.inputButton}>
                    {/* <TextInput onKeyDown={enter} type="text" placeholder="Write your comment here"  onChange={(e)=>setUpdatedComment(e.target.value)} value={updatedComment}/> */}
                    <TextInput 
                        placeholder="Write a comment"
                        placeholderTextColor = 'white'
                        color = 'white'
                        style = {styles.input}
                        onChangeText={(e) => setUpdatedComment(e)}
                        value={updatedComment}
                    />
                    <Text style={[styles.button,styles.send]} onPress={() => send()}>Send</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        fontSize: 20,
        color:"white",
        backgroundColor: "#141823",
        textAlign: "center",
        borderRadius: 20,
        width:"50%"
    },
    inputButton:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    send:{
        width: '20%',
        height: 30,
        marginLeft: 10
    },
    imageText:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picUser: {
        width: 50,
        height: 50,
        borderRadius: 800
    },
    containerText: {
        position:"absolute",
        width:"100%",
        backgroundColor: "#aeafafab",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: 'white',
        // fontFamily:'VarelaRound_400Regular',
        fontSize: 20,
        // marginLeft: 10,
        // position: "absolute"
        marginHorizontal: 5
    },
    preloader:{
        // marginTop: 10,
        width: "100%",
        height: 500
    },
    input: {
        width: '60%',
        height: 60,
        backgroundColor: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'none',
        borderRadius: 20,
        borderColor: "red"
    },
    caja:{
        alignItems: "center"
    },
    container: {
        width: '100%',
        backgroundColor: '#000',
        // flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-around',
        borderColor: 'white',
        paddingVertical: 5,
        borderRadius: 10,
        margin: 5    
    },
    nombreCiudad: {
        paddingBottom:20,
        color:'white',
        fontSize: 10,
    },
    fotoCiudad: {
        width: 350,
        height: 250,
        borderRadius:45,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})

const mapStateToProps = state => {
    return {
        user: state.auth.userLogged,
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)