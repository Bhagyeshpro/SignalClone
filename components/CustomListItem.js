import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../firebase/firebase';

const CustomListItem = ({id, chatName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            )
            return unsubscribe
    })


    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
        <Avatar
            rounded
            source={{
                uri: chatMessages?.[0]?.photoURL ||
                    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight: 700}}>
                {chatName}
            </ListItem.Title>
            {/* numberOfLines is for ... after text */}
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
                {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
