import React, { useRef, useState, useEffect, useContext } from 'react';
import { Share, ScrollView, Linking, TouchableOpacity, Text, Image, StyleSheet, View, TextInput, Button, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import CachedImage from '../components/CachedImage'
import DisplayTypes from './DisplayTypes';
import CommentModal from './CommentModal';
import RateModal from './RateModal';
import { UserContext } from '../providers/fire'


const PlaceDetails = ({ item }) => {
    const [comment, setComment] = useState('');
    const { user, userDetails, setUserDetails } = useContext(UserContext)
    const [rateVisable, setRateVisable] = useState(false)
    const [ratingSent, setRatingSent] = useState(false)
    const [isReviewed, setIsReviewed] = useState(false)
    let carRef = useRef(null);

    useEffect(() => {
        if (userDetails) {
            if (userDetails.placesrated.includes(item.docID)) {
                setIsReviewed(true)
            } else {
                setIsReviewed(false)
            }
        }
    }, [userDetails])



    const renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 0 }}>
                <Image
                    style={{ height: 300, width: '100%', borderRadius: 10 }}
                    source={{
                        uri: item,

                    }}
                />
            </View>
        );
    }
    const handleSave = async () => {
        await db.collection('users').doc(user.uid).update({
            favorites: firebase.firestore.FieldValue.arrayUnion(item.docID)
        })

        setUserDetails({ favorites: [...favs, item.docID] })
    }

    return (
        <View style={[styles.item]}>
            <RateModal setRatingSent={setRatingSent} docID={item.docID} ratingnum={item.ratingnum} rating={item.rating} rateVisable={rateVisable} setRateVisable={setRateVisable} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setRateVisable(true)}>
                    <Text>{Math.round(item.rating * 100) / 100}</Text>
                    {isReviewed ?
                        <AntDesign name='star' size={25} color='orange' />
                        : <AntDesign name='staro' size={25} color='grey' />}
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>Daniel Zeglen - {new Date(item.date.seconds * 1000).toDateString()}</Text>

            <Text style={styles.desc}>{item.description}</Text>
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Carousel
                    ref={carRef}
                    data={item.imgs}
                    renderItem={renderItem}
                    containerCustomStyle={{ marginTop: 10, padding: 0, flexGrow: 0 }}
                    layout={'default'}
                    sliderWidth={350}
                    itemWidth={350}
                    removeClippedSubviews={false}
                />
            </View>
            <View style={{ marginTop: 10, paddingBottom: 0 }}>
                <Button title={item.formattedAddr} onPress={() => Linking.openURL(`maps://app?daddr=${item.lat}+${item.lng}`)} />
            </View>
            <View style={{ marginTop: 0 }}>
                <DisplayTypes food={item.food} entertainment={item.entertainment} under15={item.under15} free={item.free} outdoors={item.outdoors} lake={item.lake} datespot={item.datesport} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15 }}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'grey', paddingLeft: 10 }}>{item.commentnum} comment(s)</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-end' }}>
                    <TouchableOpacity>

                        <AntDesign name='pushpino' size={25} color='grey' style={{ paddingRight: 10 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <AntDesign name='upload' size={25} color='grey' />
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    )
};


const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18,
        flex: 1,
    },
    desc: {
        paddingBottom: 5,
        paddingLeft: 5
    },
    name: {
        flex: 1,
        paddingLeft: 5,
        color: 'grey'
    }
});
export default PlaceDetails;