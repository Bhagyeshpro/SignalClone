import React, { useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../../firebase/firebase';
import {styles} from "./Styles"

export default function AddChatScreen({navigation}) {
    const [input, setInput] = useState("");

    const createChat = async () => {
        await db
            .collection("chats")
            .add({
                chatName: input,
            })
            .then(() => {
                navigation.goBack();
            })
            .catch(error => alert(error))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Add a new Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Input
                placeholder="Create a new Chat"
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="AntDesign" size={24} color="black" />
                }
            />
                <Button disabled={!input} onPress={createChat} title="Create new Chat" />
        </View>
    )
}
