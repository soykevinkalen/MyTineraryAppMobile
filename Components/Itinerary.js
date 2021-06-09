import React, { useEffect, useState, useRef } from 'react';
import itinerariesActions from '../redux/actions/itinerariesActions'
import activitiesActions from '../redux/actions/activitiesActions'

import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ToastAndroid } from 'react-native';
import Header from './Header'
import { connect } from "react-redux"
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Comment from './Comment'
import {Icon} from 'react-native-elements'


const Itinerary = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [activities, setActivities] = useState([])
    const [likes, setLikes] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [allComments, setAllComments] = useState(props.itinerary.comments)
    const [viewItinerary, setViewItinerary] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(props.user){
            if(props.itinerary.usersLiked.indexOf(props.user.email) !== -1){
                setLikes(true)
            }else{
                setLikes(false)            
            }
        }
    },[props])
    
    const view = async () => {
        setIsOpen(!isOpen)
        if(!isOpen){
            const activity = await props.getActivitiesByItinerary(props.itinerary._id)
            setActivities(activity.data.respuesta)
        }
    }
    const like = async () => {
        if(props.user){
            setLoading(false)
            await props.likes(props.user, props.itinerary)
            setLikes(!likes)
            setLoading(true)
        }else{
            ToastAndroid.showWithGravityAndOffset(
                "Please start section",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }
   
    const sendValues = async () => {
        if(props.user){
            setLoading(false)
            if(newComment.trim() !== ""){
                const itinerary = await props.putComments(props.user,props.itinerary._id, newComment)
                setAllComments(itinerary.comments)
                setNewComment('')
                setLoading(true)
            }
        }else{
            ToastAndroid.showWithGravityAndOffset(
                "Please start section",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }
    const deleteComment = async (comment) =>{
        const response = await props.deleteComment(props.user, comment, props.itinerary)
        setAllComments(response.comments)
    }

    const updateComment = async (comment) =>{
        const response = await props.updateComment(props.user, comment, props.itinerary)
        setAllComments(response.comments)        
    }

    return(        
        <View style={styles.container}>
            <Text style={[styles.text,styles.title,styles.commentTitle]}>{props.itinerary.title}</Text>
            <ImageBackground style={styles.picUser} source={{uri:`${props.itinerary.authorImage}`}}></ImageBackground>
            <Text style={styles.text}>{props.itinerary.authorName}</Text>
            <View style={styles.caja}>
                <View style={styles.valoration}>
                    <Icon type='material-community' name='heart-outline' size={30} color = {likes ? 'red' : 'black'} onPress = {() => loading ? like() : null} />
                    <Text style={styles.text}>
                        {props.itinerary.usersLiked.length}
                    </Text>
                </View>
                <View style={styles.valoration}>
                    <Text style={styles.text}>
                        Price:
                    </Text>
                        {[...Array(props.itinerary.price)].map((p,i) => <Icon type='material-community' name='cash' size={30} color = 'green' key={i} />)}
                </View>
                <View style={styles.valoration}>
                    <Icon type='material-community' name='timer' size={30} color = 'rgb(0,113,178)' />
                    <Text style={styles.text}>
                        {props.itinerary.duration} hours
                    </Text>
                </View>
               
            </View>
            <View style={styles.hashtagContainer}>
                {
                    props.itinerary.hashtag.map(hashtag => <Text style={[styles.text,styles.hash]} key={hashtag}>#{hashtag}</Text>)
                }
            </View>
            
            {isOpen && (<View style={{width: '100%'}}>
                <View style={styles.activityContainer}>
                    <Text style={[styles.text,styles.title]}>Activities</Text>
                    {
                        activities.map(activity => {
                            return(
                            <ImageBackground style={styles.picActivity} key={activity.title} source={{uri:`${activity.image}`}}>
                                <View style={{alignItems:'center', width:'100%',backgroundColor:"#ffffffaa"}}>
                                    <Text style={[styles.text,styles.activityTitle]}>{activity.title}</Text>
                                </View>
                            </ImageBackground>)
                        })
                    }
                </View>
                <ImageBackground source={{uri:"https://i.ibb.co/cQLgmDh/northern-lights-1197755-1920.jpg"}} style={styles.commentContainer}>
                    <Text style={[styles.text,styles.title,styles.commentTitle]}>Comments</Text>
                    <ScrollView style={styles.commentsContainer}>
                        {allComments.length ? 
                            allComments.map(comment => {
                                return(
                                    <Comment key={comment._id} setViewItinerary={setViewItinerary} comment={comment} itinerary={props.itinerary} deleteComment={deleteComment} updateComment={updateComment}/>
                                )
                            })
                            : <View>
                                <Text>Be the first to comment</Text>
                            </View> 
                        }
                    </ScrollView>
                {viewItinerary && <View style={styles.inputButton}>     
                    <TextInput 
                        placeholder="Write a comment"
                        placeholderTextColor = 'white'
                        color = 'white'
                        style = {styles.input}
                        onChangeText={(e) => setNewComment(e)}
                        value={newComment}
                        editable={props.user ? true : false}
                    />
                    <Text style={[styles.button,styles.send]} onPress={()=> loading ? sendValues() : null}>Send</Text>
                    </View>}
                </ImageBackground>
            </View>)}
            <Text style={styles.button} onPress={()=> view()}>{isOpen ? 'View Less' : 'View More'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    commentTitle:{
        width: "100%",
        backgroundColor: 'rgba(16,16,16,0.5)',
        textAlign: 'center'
    },
    commentContainer:{
        width: '100%',
        alignItems:'center',
        justifyContent: 'space-around',
        
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
    activityTitle:{
        color: 'black'
    },
    activityContainer:{
        width: '100%'
    },
    title:{
        marginVertical: 5
    },
    hashtagContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom: 10
    },
    button:{
        fontSize: 20,
        color:"white",
        backgroundColor: "#141823",
        textAlign: "center",
        borderRadius: 20,
        width:"50%",
        marginVertical: 10
    },
    valoration:{
        flexDirection:'row',
        marginTop: 5,
    },
    hash: {
        color:'#0572e6',
        marginHorizontal: 5,
    },
    picActivity: {
        width: '100%',
        height: 200,
        marginBottom: 10
    },
    picUser: {
        width: 100,
        height: 100
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
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
        backgroundColor: 'rgba(60,42,116,0.7)',
        alignItems:'center',
        justifyContent: 'space-around',
    },
    
    
})

const mapStateToProps = state => {
    return {
        user: state.auth.userLogged,
        itinerariesByCity: state.itinerary.itinerariesByCity
    }
}
const mapDispatchToProps = {
    getActivitiesByItinerary : activitiesActions.getActivitiesByItinerary,
    putItinerary: itinerariesActions.putItinerary,
    putComments: itinerariesActions.putComments,
    likes: itinerariesActions.likes,
    deleteComment: itinerariesActions.deleteComment,
    updateComment: itinerariesActions.updateComment    
}


export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)