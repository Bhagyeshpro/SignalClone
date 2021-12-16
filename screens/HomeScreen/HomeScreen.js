import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../../components/CustomListItem'
import {auth, db} from "../../firebase/firebase"
import {AntDesign, SimpleLineIcons} from  "@expo/vector-icons"

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) => setChats(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: "#fff"},
            headerTitleStyle: {color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    {/* ? is used for if user is undefined */}
                    <Avatar rounded source={{uri: auth?.currentUser?.photoURL }} />

                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width :80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])
    return (
        <SafeAreaView>
        <ScrollView>
        {chats.map(({id, data: {chatName}})=> (
            <CustomListItem chatName={chatName} key={id} id={id} />
        ))}

        </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: 100,
    },
});