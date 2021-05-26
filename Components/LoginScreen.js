import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";

const LoginScreen = ({ navigation }) => {
  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: "974935643152-njitq8e3k3o8a2mjrrdab6ul1lbvicu4.apps.googleusercontent.com",
        androidClientId: "974935643152-mbved12rng5vjl4r2bpr0ihm3umjg2m5.apps.googleusercontent.com",
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
        console.log(user)
        // navigation.navigate("Profile", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Google" onPress={signInAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        marginTop: 10
    }
});

export default LoginScreen;
