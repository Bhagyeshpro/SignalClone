import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"    
    },
    receiverText: {
         color: "black",
        fontWeight: "500",
        marginLeft: 10,
        fontSize: 15,
    },
    sender: {
        padding: 15,
        backgroundColor: "#286BE6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
         left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },

    senderText: {
         left: 10,
        paddingRight: 10,
        fontSize: 15,
        color: "white",
    },
});