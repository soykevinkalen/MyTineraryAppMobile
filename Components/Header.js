import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icon} from 'react-native-elements'

const Header = (props) => {
    return(        
        <View style={styles.container}>
            <View style={styles.icontitle}>
                <Icon 
                    type='material-community'
                    name='airplane-takeoff'
                    size={60}
                    color = '#7198b5'
                />
                <Text style={styles.text}>MyTinerari</Text>
            </View>
            {/* <Text style={styles.text}>Log In</Text>
            <Text style={styles.text}>Sign Up</Text> */}
            <Icon 
                type='material-community'
                name='dots-vertical'
                size={40}
                color = '#7198b5'   
                onPress={() => props.navigation.openDrawer()}            

            />
            {/* <Text style={styles.text}>Home</Text>
            <Text style={styles.text}>Cities</Text>         */}
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
        fontFamily:'VarelaRound_400Regular',
        marginLeft: 5,
        fontSize: 30        
    },
    icontitle: {
        flexDirection: 'row',
        alignItems:'center',
        width:'50%',

    }
})

export default Header