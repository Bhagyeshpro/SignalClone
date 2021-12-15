// import "react-native-gesture-handler" //Maybe Error 
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

const Stack = createNativeStackNavigator();

// Change all screenstyle at once using global variable  
const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2C6BED"},
  headerTitleStyle: {color: "white"}, //Change header color and 
  headerTintColor: "white", //Change any logo inside header white
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={globalScreenOptions}>
      <Stack.Screen options={{title:"Let's Sign Up"}} name="Login" component={LoginScreen}/>
      <Stack.Screen options={{title:"Let's Register"}} name="Register" component={RegisterScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
