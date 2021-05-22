import React, { useEffect, useState, useRef } from 'react';
import itinerariesActions from '../redux/actions/itinerariesActions'
import activitiesActions from '../redux/actions/activitiesActions'

import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';
import Header from './Header'
import { connect } from "react-redux"
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Comment from './Comment'
import {Icon} from 'react-native-elements'


const Itinerary = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [hashtag, setHashtag] = useState('')
    const [itinerariesCoincidencies, setItinerariesCoincidencies] = useState([])
    const [itineraries, setItineraries] = useState([])
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
    let coincidencies = []
    const getItinerariesHashtag = (e) =>{
        itineraries.map(itinerary =>{
            itinerary.hashtag.map(hashtag => {
                if(hashtag === e.target.value){
                    coincidencies = [...coincidencies, itinerary]
                }
                return null
            })
            return null
        })
        setItinerariesCoincidencies(coincidencies)
        setShow(true)
        setHashtag(e.target.value)
    }
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
        }
    }
   
    const sendValues = async (itineraryId) => {
        if(props.user){
            setLoading(false)
            if(newComment.trim() !== ""){
                const itinerary = await props.putComments(props.user,itineraryId, newComment)
                setAllComments(itinerary.comments)
                setNewComment('')
                setLoading(true)
            }
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
            <Text>{props.itinerary.title}</Text>
            <ImageBackground style={styles.picUser} source={{uri:`${props.itinerary.authorImage}`}}></ImageBackground>
            <Text>{props.itinerary.authorName}</Text>
            <View>
                <Text>
                    <Icon 
                        type='material-community'
                        name='heart-outline'
                        size={30}
                        color = {`${likes ? 'red' : 'white' }`} 
                        onPress = {() => loading ? like : null}           
                    />
                    {props.itinerary.usersLiked.length}
                </Text>
                <Text>
                    Price:
                    {[...Array(props.itinerary.price)].map((p,i) => <Icon 
                                                                        type='material-community'
                                                                        name='cash'
                                                                        size={30}
                                                                        color = 'green' 
                                                                        key={i}  
                                                                    />)}
                </Text>
                <Text>
                    <Icon 
                        type='material-community'
                        name='timer'
                        size={30}
                        color = 'blue'           
                    />
                     {props.itinerary.duration} hours
                </Text>
                {/* <div><FavoriteIcon className='curser' style={{color:`${likes ? 'red' : 'white' }`}} onClick={loading ? like : null}/> {props.itinerary.usersLiked.length} </div>
                <div> <span>Price: </span>{[...Array(props.itinerary.price)].map((p,i) => <LocalAtmIcon className="diner" key={i}/>)}</div>
                <div><WatchLaterIcon className="watch"/> {props.itinerary.duration} <span>hours</span></div> */}
            </View>
            <View>
                {
                    props.itinerary.hashtag.map(hashtag => <Text key={hashtag}>#{hashtag}</Text>)
                }
            </View>
            
            {isOpen && (<View>
                <View>
                    <Text>Activities</Text>
                    {
                        activities.map(activity => {
                            return(
                            <ImageBackground style={styles.picActivity} key={activity.title} source={{uri:`${activity.image}`}}>
                                <View>
                                    <Text>{activity.title}</Text>
                                </View>
                            </ImageBackground>)
                        })
                    }
                </View>
                <View>
                    <Text>Comments</Text>
                    <View>
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
                    </View>
                {viewItinerary && <View>     
                    <TextInput />
                    <Text>Send</Text>
                    </View>}
                </View>
            </View>)}
            <Text onPress={()=> view()}>{isOpen ? 'View Less' : 'View More'}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    
    picActivity: {
        width: 100,
        height: 100
    },
    picUser: {
        width: 100,
        height: 100
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