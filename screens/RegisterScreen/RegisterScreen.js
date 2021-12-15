import React, { useLayoutEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from '../RegisterScreen/Styles'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar} from "expo-status-bar"
import {Button, Text,Input, Image} from "react-native-elements"
import { auth } from "../../firebase/firebase";

export default function RegisterScreen({navigation}) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageURL, setImageURL] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [])

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name, 
                    photoURL : imageURL || "https://blogger.googleusercontent.com/img/a/AVvXsEgmNkbnylpQd0lndtjzI2PczwAoJJDvj1Ekb3C47dZgl5t_AKK0g6pxM39OloaZ7FPElGa4PqFuigmEzuoG7YyzU7GL_lP2dgmPhOzd3ZVgjRDVupS7gwIzj7xfasrykUchPFA22FMG30SbHY2XnICvWtf4Sur4bywDPTO78p8Yhdv6T2H9lQVjxFsh"
                })
            })
            .catch((error) => alert(error.message))
    }
    return (
        // Keyboard Avoiding View for hidden content because of keyboard
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light"/>
            {/* <Image
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Signal-Logo.svg"
                }}
                style={styles.logoImage}
            /> */}
            <Text h3 style={{marginBottom :50}}>
                Create a Signal Account
            </Text>
            <View  style={styles.inputContainer}>
                {/* autoFocus: When ever the stack screen is started the focus will go to selected autoFocus */}
                <Input
                    placeholder="Your Name"
                    autoFocus
                    value={name}
                    type="text"
                    onChangeText={(text) => setName(text)}
                />
                <Input placeholder="Enter Your Email" 
                 type="email"  
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input placeholder="Password" secureTextEntry type="password" 
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    placeholder="Image URL"
                    value={imageURL}
                    type="text"
                    onChangeText={(text) => setImageURL(text)}
                    onSubmitEditing={register}
                />

                {/* For styling react native element use containerStyle: */}
                <Button
                    raised
                    onPress={register}
                    title="Register"
                     containerStyle={styles.button}
                />

                {/* Outline inverse the style of button */}
                {/* <Button containerStyle={styles.button} onPress={registerUser} title="Register" outline />
                <Button containerStyle={styles.button} onPress={() => navigation.navigate("Login")} title="Login" /> */}
                {/*     For Breathing space */}
                <View style={{ height: 100}}></View>
            </View>
        </KeyboardAvoidingView>
    )
}
