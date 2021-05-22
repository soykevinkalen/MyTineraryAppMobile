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
    
    return(        
        <View style={styles.container}>
            <View>
                <View>
                    <ImageBackground style={styles.picUser} source={{uri:`${props.comment.userId.userImage}`}}></ImageBackground>
                    <Text>{props.comment.userId.firstName + " " + props.comment.userId.lastName }</Text>
                </View>
                
            {
                (props.user && props.comment.userId.email === props.user.email) ? 
                <>
                {close ? <Icon 
                        type='material-community'
                        name='close-box'
                        size={30}
                        color = 'blue'
                        onPress={()=> setClose(!close)}           
                    /> : 
                <View> 
                <Icon 
                        type='material-community'
                        name='pencil-outline'
                        size={30}
                        color = 'blue'
                        onPress={() => edit(props.comment)}           
                    />
                <Icon 
                        type='material-community'
                        name='delete'
                        size={30}
                        color = 'blue'
                        onPress = {() => props.deleteComment(comment)}           
                    />
                </View>}
                </> : null
            }

            </View>
            {!view && 
            <Text >{props.comment.comment}</Text>}
            {view && (
                <View className='commentsEdit'>
                    <TextInput onKeyDown={enter} type="text" placeholder="Write your comment here"  onChange={(e)=>setUpdatedComment(e.target.value)} value={updatedComment}/>
                    <Text onClick={send}>Send</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    picUser: {
        width: 50,
        height: 50
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
        justifyContent: 'space-around'    
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