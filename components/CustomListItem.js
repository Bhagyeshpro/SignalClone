import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const CustomListItem = () => {
    return (
        <ListItem>
        <Avatar
            rounded
            source={{
                uri:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
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
