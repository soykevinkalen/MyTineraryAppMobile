import React, { useEffect } from 'react';
import citiesActions from '../redux/actions/citiesActions'
import { StyleSheet, View } from 'react-native';
import { connect } from "react-redux"
import LottieView from 'lottie-react-native';
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
        width: "100%",
        height: 1000,
        backgroundColor: 'black'
    },
    container: {
        width: '100%',
        backgroundColor: '#000',
        alignItems:'center',
        justifyContent: 'space-around'    
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