import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const UploadButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{paddingLeft:15}}>
            <View style={styles.container}>
                <FontAwesome name='camera' size={32} color='black' />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'

    }
});

export default UploadButton;