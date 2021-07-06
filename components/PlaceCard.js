import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, Share } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CachedImage from '../components/CachedImage'
import DisplayTypes from './DisplayTypes';
import { SwipeRow } from 'react-native-swipe-list-view';
import RateModal from './RateModal';


const PlaceCard = ({ item, onPress, style, onNavigate }) => {
    const [rateVisable, setRateVisable] = useState(false)
    const [ratingSent, setRatingSent] = useState(false)
    let displayImages

    const onShare = async () => {
        let title = item.title
        let uri = item.imgs[0]

        console.log(uri)
        console.log('^^^uri^^^^')
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
        <CachedImage
            style={{ height: 200, width: '100%', borderRadius: 20 }}
            source={{
                uri: item.imgs[0],
            }}
            cacheKey={item.docID} />
    )

    const twoImage = (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CachedImage
                style={{ height: 200, width: '49.5%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                source={{
                    uri: item.imgs[0],

                }}
                cacheKey={`${item.docID}1`} />
            <CachedImage
                style={{ height: 200, width: '49.5%', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
                source={{
                    uri: item.imgs[1],

                }}
                cacheKey={`${item.docID}2`} />
        </View>
    )

    const threeImage = (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <CachedImage
                style={{ height: 200, width: '49.5%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                source={{
                    uri: item.imgs[0],

                }}
                cacheKey={`${item.docID}0`} />

            <View style={{ width: '49.5%', justifyContent: 'space-between' }}>
                <CachedImage
                    style={{ height: 98, width: '100%', borderTopRightRadius: 20 }}
                    source={{
                        uri: item.imgs[1],

                    }}
                    cacheKey={`${item.docID}1`} />
                <CachedImage
                    style={{ height: 98, width: '100%', borderBottomRightRadius: 20 }}
                    source={{
                        uri: item.imgs[2],

                    }}
                    cacheKey={`${item.docID}2`} />
            </View>


        </View>
    )

    if (item.imgs.length == 1) {
        displayImages = oneImage
    } else if (item.imgs.length == 2) {
        displayImages = twoImage
    } else {
        console.log('THREE')
        displayImages = threeImage
    }

    return (
        <View style={[styles.item, style]}>
            <RateModal setRatingSent={setRatingSent} docID={item.docID} ratingnum={item.ratingnum} rating={item.rating} rateVisable={rateVisable} setRateVisable={setRateVisable} />
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.title}>THIS IS GOING TO BE A VERY VEYR VEYR VRY LONG TITLE HEHEHE</Text>
                    <TouchableOpacity onPress={onNavigate} >
                        <Ionicons name='arrow-forward' size={25} color='grey' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>Daniel Zeglen</Text>
                <Text style={styles.desc}>{item.description}</Text>
                {displayImages}
                <DisplayTypes food={item.food} entertainment={item.entertainment} under15={item.under15} free={item.free} outdoors={item.outdoors} lake={item.lake} datespot={item.datesport} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15 }}>
                    <View style={{ flexDirection: 'row', width: 100 }}>

                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() => setRateVisable(true)}>
                            <Text>{item.rating}</Text>
                            
                            <AntDesign name='staro' size={25} color='grey' />
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={onNavigate}>
                            <Text style={{ color: 'grey', paddingLeft: 10 }}>{item.commentnum} comment(s)</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-end' }}>
                        <AntDesign name='pushpino' size={25} color='grey' style={{ paddingRight: 10 }} />
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
        minWidth: 50
    }
});
export default PlaceCard;