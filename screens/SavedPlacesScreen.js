import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native'
import CachedImage from '../components/CachedImage';
import { UserContext } from '../providers/fire'

const SavedPlacesScreen = (props) => {
    const { createAccount, user, logout } = useContext(UserContext)
    let str = 'https://firebasestorage.googleapis.com/v0/b/spots-2385a.appspot.com/o/knLTWAQyj0crULeO5CHTpb9B4sC2%2FSun%20Jul%2004%202021%2015%3A05%3A00%20GMT-0400%20(EDT)%2Fimage1?alt=media&token=002a5ae0-155f-4394-8cb9-4f59387976a2';
    let inx = str.indexOf('image')
    let spl = str.slice( 0, inx+6)
    let spl2 = str.slice(inx+6, str.length)
    console.log(str)
    console.log(inx)
    console.log(spl)
    console.log(spl2)

    return (
        <View style={styles.main}>
            <Text>Saved Screen</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
    },

})

export default SavedPlacesScreen;