import React, { useState, useContext } from 'react';
import { Animated, TouchableOpacity, Text, Image, StyleSheet, View, Share } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CachedImage from '../components/CachedImage'
import DisplayTypes from './DisplayTypes';
import { SwipeRow } from 'react-native-swipe-list-view';
import RateModal from './RateModal';
import { UserContext } from '../providers/fire'
import { db } from '../fireconfig'
import firebase from 'firebase'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

const PlaceSavedCard = ({ postData, setPostData, item, onPress, style, onNavigate }) => {
    const { user, userDetails, setUserDetails } = useContext(UserContext)
    const [rateVisable, setRateVisable] = useState(false)
    const [ratingSent, setRatingSent] = useState(false)
    let favs

    if (userDetails) {
        favs = userDetails.favorites
    }
    const handleRemove = async (e) => {
       
        console.log(userDetails.favorites)
        console.log(e)
        console.log('^^^^e^^^^')
            await setUserDetails({
                favorites: userDetails.favorites.filter(function (item) {
                    return item !== e
                })
            });
            console.log(userDetails.favorites)
            
       await db.collection('users').doc(user.uid).update({
            favorites: firebase.firestore.FieldValue.arrayRemove(e)
        })

    }



    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <TouchableOpacity onPress={() => handleRemove(item.docID)}>
                <RectButton >
                    <Animated.View
                        style={[
                            {
                                backgroundColor: '#ff6678',
                                justifyContent: 'center',
                                height: 120,
                                marginTop: 10,
                                transform: [{ translateX: trans }],
                            },
                        ]}>

                        <Ionicons name='ios-trash' size={35} color='white' style={{ paddingRight: 15, paddingLeft: 5 }} />
                    </Animated.View>
                </RectButton>
            </TouchableOpacity>
        );
    };


    return (
        <Swipeable renderLeftActions={renderLeftActions}  >
            <View style={[styles.item, style]}>

                <TouchableOpacity onPress={onNavigate} >
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>

                            <CachedImage
                                style={{ height: 100, width: 100, borderRadius: 20 }}
                                source={{
                                    uri: item.imgs[0],
                                }}
                                cacheKey={item.docID} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Swipeable>
    )
};


const styles = StyleSheet.create({
    item: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginVertical: 8,
        marginLeft: 0,
    },
    title: {
        fontSize: 16,
    },
    desc: {
        paddingBottom: 5,
        paddingLeft: 5,
    },
    name: {
        paddingLeft: 5,
        color: 'grey',
        minWidth: 50
    }
});
export default PlaceSavedCard;