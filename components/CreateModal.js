import React, { useState, useContext } from 'react';
import { Button, TextInput, ActivityIndicator, TouchableOpacity, Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { db } from '../fireconfig'
import { UserContext } from '../providers/fire'

const CreateModal = ({ navigation, setCreateModalVisable, createModalVisable }) => {
    const { createAccount, user, logout, signIn } = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={createModalVisable}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView2}>
                    <View style={styles.modalView}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Login</Text>
                        </View>
                        <View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={{ fontSize: 12, alignSelf: 'baseline' }}>Email:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder='email...'></TextInput>
                                <Text style={{ fontSize: 12, alignSelf: 'baseline' }}>Password:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder='password...'></TextInput>
                                <TouchableOpacity onPress={() => signIn(email, password)} style={{ backgroundColor: '#0244ad', width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>Sign up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={setCreateModalVisable}  style={{ backgroundColor: 'white', borderWidth: 0.5, width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20, }}>Go back</Text>
                                </TouchableOpacity>
                               
                            </View>

                        </View>

                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setCreateModalVisable(true)} style={{ borderColor: '#0244ad', borderWidth: 1, width: '70%', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 10 }}>
                <Text>Sign in</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    centeredView2: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 35,
        width: '100%',
        height: '70%',
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
    input: {
        width: 300,
        height: 50,
        margin: 12,
        paddingLeft: 10,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: 'white'
    },
});


export default CreateModal