import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icon} from 'react-native-elements'

const Header = () => {
    
    return(        
        <View style={styles.container}>
            <Icon 
                type='material-community'
                name='airplane-takeoff'
                size={30}
                color = '#7198b5'            
            />
            <Text style={styles.text}>MyTinerari</Text>
            <Text style={styles.text}>Log In</Text>
            <Text style={styles.text}>Sign Up</Text>
            <Text style={styles.text}>Home</Text>
            <Text style={styles.text}>Cities</Text>        
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

export default Header