import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../../firebase/firebase'
import {styles} from "./Styles"
import {AntDesign,FontAwesome, Ionicons, SimpleLineIcons} from  "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import firebase from "firebase"

export default function ChatScreen({navigation, route}) {
    const [input, setInput] = useState("")    
    const [messages, setMessages] = useState([])

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
                    <Avatar rounded source={{
                        uri: messages[0]?.data.photoURL ||
                        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"}}/>
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
    }, [navigation, messages])

    const sendMessage = () => {
        // Dismiss keyboard after sending msg
        Keyboard.dismiss();

        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName : auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput("")
    }

    // Using useLayoutEffect not useEffect cause we are dependent on route here
    useLayoutEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(route.params.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => 
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
            return unsubscribe;
    }, [route])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >

            {/* When pressing anywhere in screen keyboard will dismiss */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <>
                <ScrollView contentContainerStyle={{paddingTop: 15}}>
                    {/* Chat goes here */}
                    {messages.map(({id, data}) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.receiver}>
                                <Avatar  
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={24}
                                    // WEB
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -15,
                                            right: -5,
                                    }}
                                    source={{
                                        uri: data.photoURL
                                    }}
                                />
                                <Text style={styles.receiverText}>{data.message}</Text>
                            </View>
                        ):(
                            <View key={id} style={styles.sender} >
                                <Avatar  
                                     position="absolute"
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={24}
                                    // WEB
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -15,
                                            right: -5,
                                    }}
                                    source={{
                                        uri: data.photoURL
                                    }}
                                />
                                <Text style={styles.senderText}>{data.message}</Text>
                                <Text style={styles.sendetName} >{data.displayName}</Text>
                            </View>
                        )
                    ))}
                </ScrollView>
                
                    <View style={styles.footer}>
                        <TextInput 
                            value={input}
                            onChangeText={text => setInput(text)}
                            placeholder='Message...'
                            onSubmitEditing={sendMessage} 
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
