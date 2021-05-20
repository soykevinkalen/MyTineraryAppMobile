import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import {Icon} from 'react-native-elements'

const SignIn = () => {
    return(        
        <View style={styles.container}>
            <Text style={styles.text}>MyTinerari</Text>
            <Text style={styles.text}>SignIn</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-around'    
    },
    text: {
        color: 'white',
        fontFamily:'VarelaRound_400Regular'        
    }
})

export default SignIn