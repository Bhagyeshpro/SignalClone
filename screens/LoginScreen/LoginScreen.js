import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar} from "expo-status-bar"
import {Button,Input, Image} from "react-native-elements"
import "./Styles"
import { styles } from './Styles'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../../firebase/firebase'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Every Time user opens or refresh the app it will fetch login data
    useEffect(() => {
        // unsubscribe will increase apps performance

        const unsubscribe = auth.onAuthStateChanged((authUser) => {
        console.log(authUser);
            
            if(authUser) {
                navigation.replace("Home");
            }
            // Cleanup code
            return unsubscribe;
        })


    }, [])

    const signIn = () => {
        // We are passing promises up
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error))
    }

    return (
        // Keyboard Avoiding View for hidden content because of keyboard
        <KeyboardAvoidingView behavior='padding'     style={styles.container}>
            <StatusBar style="light"/>
            <Image
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Signal-Logo.svg"
                }}
                style={styles.logoImage}
            />
            <View  style={styles.inputContainer}>
                {/* autoFocus: When ever the stack screen is started the focus will go to selected autoFocus */}
                <Input placeholder="Enter Your Email..." autoFocus type="email"  
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input placeholder="Password" secureTextEntry type="password" 
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
                />
                <View style={styles.buttonContainer}>
                {/* Outline inverse the style of button */}
                <Button containerStyle={styles.button} onPress={signIn} title="Login" />
                <Button containerStyle={styles.button} onPress={() => navigation.navigate("Register")} title="Register" outline />
                </View>
                {/* For Breathing space */}
                <View style={{ height: 100}}></View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

