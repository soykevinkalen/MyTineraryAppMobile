import React, { useEffect, useState, useRef } from 'react';
import itinerariesActions from '../redux/actions/itinerariesActions'
import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';
import Header from './Header'
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
            <ImageBackground style={styles.fotoCiudad} source={{uri:`${city.path}`}}>
                <View style={styles.containerText}>
                    <Text style={styles.text}>{city.city}</Text>
                </View>
            </ImageBackground>
            <ScrollView style={styles.itineraries}>
            {
                props.itinerariesByCity.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary}/>)
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    itineraries: {
        height: "100%"
    },
    containerText: {
        position:"absolute",
        width:"100%",
        backgroundColor: "rgba(16,16,16,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    container: {
        width: '100%',
        backgroundColor: '#000',
        alignItems:'center',
        justifyContent: 'space-around',
        height: "100%"    
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