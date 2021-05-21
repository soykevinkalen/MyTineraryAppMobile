import React, { useEffect, useState, useRef } from 'react';
import itinerariesActions from '../Redux/actions/itinerariesActions'
import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';
import Header from '../Components/Header'
import { connect } from "react-redux"
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Itinerary from './Itinerary';

const Itineraries = (props) => {
    const [city, setCity] = useState({})
    useEffect(()=>{
        props.getItinerariesByCity(props.route.params.id)
        const cityRedux = props.citiesFilter.find(city => city._id  === props.route.params.id)
        setCity(cityRedux)
    }, [])

    return(        
        <View style={styles.container}>
            <Header />
            <ImageBackground style={styles.fotoCiudad} source={{uri:`${city.path}`}}>
                <View style={styles.containerText}>
                    <Text style={styles.text}>{city.city}</Text>
                </View>
            </ImageBackground>
            {
                props.itinerariesByCity.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary}/>)
            }

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
        itinerariesByCity: state.itinerary.itinerariesByCity,
        citiesFilter:  state.city.citiesFilter,
       
    }
}
const mapDispatchToProps = {
    getItinerariesByCity: itinerariesActions.getItinerariesByCity
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)