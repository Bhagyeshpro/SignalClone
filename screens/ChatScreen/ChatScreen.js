import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth } from '../../firebase/firebase'
import {styles} from "./Styles"
import {AntDesign,FontAwesome, Ionicons, SimpleLineIcons} from  "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'


export default function ChatScreen({navigation, route}) {
    const [input, setInput] = useState("")    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View 
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar rounded source={{uri: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"}}/>
                    <Text style={{color: "white", fontSize: 15, marginLeft:10, fontWeight: 700}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity 
                    style={{marginLeft: 10}}
                    onPress={navigation.goBack}
                >
                <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {
        // Dismiss keyboard after sending msg

        Keyboard.dismiss()
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
            <TouchableWithoutFeedback>

            <>
                <ScrollView>
                    {/* Chat goes here */}
                </ScrollView>
                
                    <View style={styles.footer}>
                        <TextInput 
                            value={input}
                            onChangeText={text => setInput(text)}
                            placeholder='Message...' 
                            style={styles.textInput} 
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} >
                            <Ionicons name='send' size={24} color="#2B68E6" />
                        </TouchableOpacity>
                    </View>
            </>
            </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
