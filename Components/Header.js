import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import {Icon} from 'react-native-elements'
import { connect } from "react-redux"

const Header = (props) => {
    console.log(props.userLogged)
    return(        
        <View style={styles.container}>
            <View style={styles.icontitle}>
                <Icon 
                    type='material-community'
                    name='airplane-takeoff'
                    size={50}
                    color = '#7198b5'
                />
                <Text style={styles.text}>MyTinerary</Text>
            </View>
            <View style={styles.imageName}>
                <ImageBackground style={styles.picUser} source={{uri: props.user ? props.user.userImage : 'https://i.ibb.co/VYzFrtX/usuario.png'}}>
                </ImageBackground>
                <Text style={styles.name}>{props.user ? props.user.firstName + " " + props.user.lastName : null}</Text>
            </View>
            <Icon 
                type='material-community'
                name='dots-vertical'
                size={45}
                color = '#7198b5'   
                onPress={() => props.navigation.openDrawer()}            

            />
            
        </View>
    )
    
}

const styles = StyleSheet.create({
    name: {
        textAlign: "center",
        color: "white"
    },
    imageName: {
        alignItems: "center",
        flexWrap: "wrap",
        marginLeft: 10
    },
    picUser: {
        width: 50,
        height: 50,
        borderRadius: 20,
        // marginLeft: 10
    },
    container: {
        width: "100%",
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'    
    },
    text: {
        color: 'white',
        fontFamily:'VarelaRound_400Regular',
        marginLeft: 5,
        fontSize: 25        
    },
    icontitle: {
        flexDirection: 'row',
        alignItems:'center',
        width:'50%',
    }
})

const mapStateToProps = state => {
    return {
        user: state.auth.userLogged
    }
}


export default connect(mapStateToProps)(Header)