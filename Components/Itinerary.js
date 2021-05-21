import React, { useEffect, useState, useRef } from 'react';
import itinerariesActions from '../Redux/actions/itinerariesActions'
import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';
import Header from '../Components/Header'
import { connect } from "react-redux"
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Itinerary = (props) => {

    useEffect(()=>{
    }, [])
    console.log(props.itinerary)
    return(        
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
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
        ItineraryByCity: state.itinerary.ItineraryByCity,
        citiesFilter:  state.city.citiesFilter,
       
    }
}
const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)