import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import Header from '../Components/Header'
import {Icon} from 'react-native-elements'

const Home = (props) => {
    
    
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
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
        // width: '100%',
        flex:1,
        // backgroundColor: '#000',
        // flexDirection: 'row',
        alignItems:'center',
        // justifyContent: 'space-around',
        height: '100%'    
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
        // marginBottom: 20
    },
    containerIconText: {
        position:"absolute",
        // margin:"auto"
        // width: '100%',
        // height: '50%',
        width:"100%",
        backgroundColor: "#aeafafab",
        // flexDirection: 'row',
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