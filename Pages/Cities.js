import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../Components/Header'

// import {Icon} from 'react-native-elements'

const Cities = () => {
    return(        
        <View style={styles.container}>
            <Header />
            <Text style={styles.text}>MyTinerari</Text>
            <Text style={styles.text}>CITIES</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default Cities