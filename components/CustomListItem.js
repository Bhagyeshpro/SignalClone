import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const CustomListItem = () => {
    return (
        <ListItem>
        <Avatar
            rounded
            source={{
                uri:"https://blogger.googleusercontent.com/img/a/AVvXsEgmNkbnylpQd0lndtjzI2PczwAoJJDvj1Ekb3C47dZgl5t_AKK0g6pxM39OloaZ7FPElGa4PqFuigmEzuoG7YyzU7GL_lP2dgmPhOzd3ZVgjRDVupS7gwIzj7xfasrykUchPFA22FMG30SbHY2XnICvWtf4Sur4bywDPTO78p8Yhdv6T2H9lQVjxFsh"
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight: 700}}>
                YouTube
            </ListItem.Title>
            {/* numberOfLines is for ... after text */}
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
                This is an Example
                This is an Example
                This is an Example
                This is an Example
                This is an Example
                This is an Example
            </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
