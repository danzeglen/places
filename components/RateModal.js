import React, { useState, useContext } from 'react';
import { Button, ActivityIndicator, Modal, StyleSheet, Text, TouchableHighlight, View, Alert } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { db } from '../fireconfig'
import { UserContext } from '../providers/fire'
import firebase from 'firebase'

const RateModal = ({ setRatingSent, docID, ratingnum, rating, rateVisable, setRateVisable }) => {
    const [inputedRating, setInputedRating] = useState(3)
    const { userDetails, user, setUserDetails } = useContext(UserContext)

    const createTwoButtonAlert = () =>
    Alert.alert(
      "You must be logged in",
      "Go to the last tab to create an account or log in",
      [
        {
          text: "Ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "Ok"
        }
      ],
      { cancelable: false }
    );

    const handleRating = () => {
        if (user) {
            let numerator = ratingnum * rating + inputedRating
            let denominator
            if (userDetails.placesrated.includes(docID)) {
                setRateVisable(false);
                return
            }
            let tempArray = userDetails.placesrated
            tempArray.push(docID)
            setUserDetails({ ...userDetails, ['placesrated']: tempArray })
            denominator = ratingnum + 1


            let newRating = numerator / denominator

            db.collection('places').doc(docID).update({
                ratingnum: denominator,
                rating: newRating,
            })
            db.collection('users').doc(user.uid).update({
                placesrated: firebase.firestore.FieldValue.arrayUnion(docID)
            })

            setRateVisable(false);
        } else {
            createTwoButtonAlert()
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={rateVisable}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <AirbnbRating
                            onFinishRating={(e) => setInputedRating(e)} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingTop: 20 }}>
                            <Button title='Go back' onPress={setRateVisable}></Button>
                            <Button title='Submit' onPress={handleRating}></Button>
                        </View>

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
        marginTop: 0,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: '80%',
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


export default RateModal