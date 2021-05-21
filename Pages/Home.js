import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../Components/Header'
import {Icon} from 'react-native-elements'
import Carousel, {ParallaxImage} from 'react-native-snap-carousel'

const cities = [
    {title: 'London', illustration: 'https://i.ibb.co/d4dvfcH/london.jpg'},
    {title: 'New York', illustration: 'https://i.ibb.co/tmNRmvR/newyork.jpg'},
    {title: 'Paris', illustration: 'https://i.ibb.co/dK9cC8z/paris.jpg'},
    {title: 'Dubai', illustration: 'https://i.ibb.co/SrdGZf2/dubai.jpg'},
    {title: 'Tokyo', illustration: 'https://i.ibb.co/DM9VcR9/tokyo.jpg'},
    {title: 'Moscow', illustration: 'https://i.ibb.co/Gk0D0cT/moscow.jpg'},
    {title: 'Tauranga', illustration: 'https://i.ibb.co/2jD32f8/tauranga.jpg'},
    {title: 'Queenstown', illustration: 'https://i.ibb.co/y637SBj/queenstown.jpg'},
    {title: 'Los Angeles', illustration: 'https://i.ibb.co/Fxyr6R1/los-Angeles.jpg'},
    {title: 'Madrid', illustration: 'https://i.ibb.co/n8jXcfd/madrid.jpg'},
    {title: 'Rome', illustration: 'https://i.ibb.co/YRJC1dH/rome.jpg'},
    {title: 'Barcelona', illustration: 'https://i.ibb.co/n0s5Y3x/barcelona.jpg'}          
]

const {width: screenWidth} = Dimensions.get('window');

const Home = (props) => {
    
    const [city, setCity] = useState([])

    useEffect(() => {
        setCity(cities)
    },[])
    
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const renderItem = ({item, index}, parallaxProps) => {
        return (
          <View style={styles.itemCarrousel}>
            <ParallaxImage
              source={{uri: item.illustration}}
              containerStyle={styles.imageContainerCarrousel}
              style={styles.imageCarrousel}
              parallaxFactor={0.4}
              {...parallaxProps}
            />
            <Text style={styles.title} numberOfLines={2}>
                {item.title}
            </Text>
          </View>
        );
    };

    return(        
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.containerScroll}>
                <View style={styles.containerIconTextImage}>
                    <Image source={require('../assets/beach.jpg')} style={styles.picture}/>
                    <View style={styles.containerIconText}>
                        <View style={styles.containerSub}>
                            <Icon 
                                type='material-community'
                                name='airplane-takeoff'
                                size={80}
                                color = '#005ca2'            
                            />
                            <Text style={styles.text}>MyTinerary</Text>

                        </View>
                        <Text style={styles.subText}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                    </View>
                </View>
                
                <View style={styles.containerCallToAction}>
                    <Image source={require('../assets/calltoaction.jpg')} style={styles.callToActionPic}/>
                    <View style={styles.textButtonContainer}>
                        <Text style={styles.textCallToAction}>Let your adventure begin!</Text>
                        <Text style={styles.buttonCallToAction} title="Cities" onPress={() => props.navigation.navigate('cities')}>Cities</Text>
                    </View>
                </View>

                <View style={styles.containerCarrousel}>
                    <TouchableOpacity onPress={goForward}>
                    
                    </TouchableOpacity>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 100}
                        data={city}
                        loop={true}
                        autoplay={true}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                    />
                  
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        position: "absolute",
        width: "100%",
        textAlign: "center",
        top: "50%",
        backgroundColor: "#aeafafab",
        fontSize: 20
    },
    containerCarrousel: {
        flex: 1,
    },
    itemCarrousel: {
        width: screenWidth - 82,
        height: screenWidth - 82,
    },
    imageContainerCarrousel: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    imageCarrousel: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    buttonCallToAction:{
        fontSize: 15,
        color:"#141823",
        backgroundColor: "#141823",
        textAlign: "center",
        borderRadius: 20
    },
    textCallToAction:{
        backgroundColor: "#aeafafab",
        color: "#000",
        fontSize: 15,
        paddingHorizontal: 5,
        marginBottom: 5
    },
    textButtonContainer:{
        color: "#000",
        position:"absolute",
        marginLeft: 15
        
    },
    containerCallToAction:{
        marginVertical: 10,
        justifyContent: "center"
    },
    callToActionPic:{
        width: "100%",
        height: 160
    },
    subText: {
        padding:5,
        textAlign:"center"
    },
    containerIconTextImage:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerScroll: {
        height: '100%',
        width: '100%'
    },
    container: {
        flex:1,
        height: '100%',
        marginBottom: 10    
    },
    text: {
        color: 'white',
        fontFamily:'VarelaRound_400Regular',
        fontSize: 40,
        marginLeft: 10
    },
    picture: {
        width: '100%',
        height: 500,
    },
    containerIconText: {
        position:"absolute",
        width:"100%",
        backgroundColor: "#aeafafab",
        justifyContent: "center",
        alignItems: "center",
    },
    containerSub: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
    }
})

export default Home