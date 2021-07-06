import React, { useState, useRef, useEffect} from 'react';
import { TextInput, Button, ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentModal = ({ modalVisable, setModalVisable,comment, setComment,handleCommentPost }) => {
    const inputRef = useRef(null)

   
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisable}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView} >
                    <View style={styles.modalView} >
                        <View  style={{width:'100%', justifyContent:'space-between',flexDirection:'row'}}>
                            <TouchableOpacity onPress={setModalVisable} style={{width:50}}>
                                <AntDesign name='closecircleo' size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCommentPost} style={{width:50}}>
                                <Ionicons name='send' size={25} />
                            </TouchableOpacity>

                        </View>
                        <TextInput value={comment} onChange={(e) => setComment(e.nativeEvent.text)} style={{alignSelf:'baseline',paddingTop:10}} multiline={true} ref={inputRef} placeholder='Share...' />
                    </View>
                </View>

            </Modal>

            <TouchableOpacity style={{ width: '100%',height:40,justifyContent:'center',borderWidth:2,borderColor:'#bfbfbf' }} onPress={() => {
                setModalVisable(true);
                setTimeout(() => inputRef.current.focus(), 500)
                
                
            }}>
                <Text style={{ alignSelf: 'baseline', color: 'grey',fontSize:16 }}> Share your experiences with this place!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        width: '100%',
        height: '45%',
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


export default CommentModal