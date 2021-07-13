import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, Share, Alert } from 'react-native'
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


const PlaceCard = ({ index, item, onPress, style, onNavigate }) => {
    const { user, userDetails, setUserDetails } = useContext(UserContext)
    const [rateVisable, setRateVisable] = useState(false)
    const [ratingSent, setRatingSent] = useState(false)
    const [isReviewed, setIsReviewed] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    let favs

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

    if (userDetails) {
        favs = userDetails.favorites
    }
    let displayImages

    const handleSave = async () => {
        if (user) {
            let tempArray = userDetails.favorites
            tempArray.push(item.docID)
            await db.collection('users').doc(user.uid).update({
                favorites: firebase.firestore.FieldValue.arrayUnion(item.docID)
            })

            setUserDetails({ ...userDetails, ['favorites']: tempArray })

        } else {
            createTwoButtonAlert()

        }


    }


    const onShare = async () => {
        let title = item.title
        let uri = item.imgs[0]

        try {
            const result = await Share.share({
                message: title,
                url: uri
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const oneImage = (
        <Image
            style={{ height: 200, width: '100%', borderRadius: 20 }}
            source={{
                uri: item.imgs[0],
            }}
        />
    )

    const twoImage = (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image
                style={{ height: 200, width: '49.5%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                source={{
                    uri: item.imgs[0],

                }}
            />
            <Image
                style={{ height: 200, width: '49.5%', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
                source={{
                    uri: item.imgs[1],

                }}
            />
        </View>
    )

    const threeImage = (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <Image
                style={{ height: 200, width: '49.5%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                source={{
                    uri: item.imgs[0],

                }}
            />

            <View style={{ width: '49.5%', justifyContent: 'space-between' }}>
                <Image
                    style={{ height: 98, width: '100%', borderTopRightRadius: 20 }}
                    source={{
                        uri: item.imgs[1],

                    }}
                />
                <Image
                    style={{ height: 98, width: '100%', borderBottomRightRadius: 20 }}
                    source={{
                        uri: item.imgs[2],

                    }}
                />
            </View>


        </View>
    )

    if (item.imgs.length == 1) {
        displayImages = oneImage
    } else if (item.imgs.length == 2) {
        displayImages = twoImage
    } else {
        displayImages = threeImage
    }

    useEffect(() => {
        try {
            if (userDetails.placesrated.includes(item.docID)) {
                setIsReviewed(true)
            } else {
                setIsReviewed(false)
            }

        } catch (err) {
            setIsReviewed(false)
        }
        try {
            if (userDetails.favorites.includes(item.docID)) {
                setIsSaved(true)
            } else {
                setIsSaved(false)
            }

        } catch (err) {
            setIsSaved(false)
        }

    }, [userDetails, user])

    let date = new Date(item.date.seconds * 1000).toDateString()
    return (
        <View style={[styles.item, style]}>
            <RateModal setRatingSent={setRatingSent} docID={item.docID} ratingnum={item.ratingnum} rating={item.rating} rateVisable={rateVisable} setRateVisable={setRateVisable} />
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <TouchableOpacity onPress={onNavigate} >
                        <Ionicons name='arrow-forward' size={25} color='grey' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>Daniel Zeglen - {date} </Text>
                {displayImages}
                <DisplayTypes food={item.food} entertainment={item.entertainment} under15={item.under15} free={item.free} outdoors={item.outdoors} lake={item.lake} datespot={item.datesport} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15 }}>
                    <View style={{ flexDirection: 'row', width: 100 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setRateVisable(true)}>
                            <Text>{Math.round(item.rating * 100) / 100}</Text>
                            <Text style={{color:'grey'}}> ({item.ratingnum})</Text>
                            {isReviewed ?
                                <AntDesign name='star' size={25} color='orange' />
                                : <AntDesign name='staro' size={25} color='grey' />}
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={onNavigate}>
                            <Text style={{ color: 'grey', paddingLeft: 10 }}>{item.commentnum} comment(s)</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={handleSave}>
                            {isSaved ?
                                <AntDesign name='pushpin' size={25} color='red' style={{ paddingRight: 10 }} />
                                : <AntDesign name='pushpino' size={25} color='grey' style={{ paddingRight: 10 }} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onShare}>
                            <AntDesign name='upload' size={25} color='grey' />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
    },
    title: {
        fontSize: 18,
        flex: 1
    },
    desc: {
        paddingBottom: 5,
        paddingLeft: 5,
    },
    name: {
        paddingLeft: 5,
        color: 'grey',
        minWidth: 50,
        paddingBottom: 10,
    }
});
export default PlaceCard;