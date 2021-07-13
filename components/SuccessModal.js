import React, { useState } from 'react';
import {Button, ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const SuccessModal = ({ successVisible, setSuccessVisible, isloading, navigation }) => {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={successVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                     <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Yay it's posted!</Text>
                            <Button title='go back' onPress={setSuccessVisible}></Button>

                        </View>
                    </View>
                    
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


export default SuccessModal