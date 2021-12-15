import React, { useLayoutEffect } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../../components/CustomListItem'
import {auth, db} from "../../firebase/firebase"
import {AntDesign, SimpleLineIcons} from  "@expo/vector-icons"

const HomeScreen = ({navigation}) => {
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }

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

                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])
    return (
        <SafeAreaView>
        <ScrollView>
        <CustomListItem/>

        </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
