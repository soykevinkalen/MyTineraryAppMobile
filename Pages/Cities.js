import React, { useEffect, useState, useRef } from 'react';
import citiesActions from '../redux/actions/citiesActions'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import Header from '../components/Header'
import { connect } from "react-redux"
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Buscador from '../components/Buscador'
const Cities = (props) => {

    useEffect(()=>{
        props.getCities()
    }, [])

    return(        
        <View style={styles.container}>
            {
                props.cities.length ? <Buscador navigation={props.navigation}/> :
                <View style={styles.preloader}>
                    <LottieView source={require('../assets/lf20_nSTCPQ.json')} autoPlay loop />
                </View>
            }            
        </View>
    )
}

const styles = StyleSheet.create({
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
    text: {
        color: 'white',
        fontFamily:'VarelaRound_400Regular'        
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
    },
})

const mapStateToProps = state => {
    return {
        cities: state.city.cities
    }
}
const mapDispatchToProps = {
    getCities: citiesActions.getCities,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)