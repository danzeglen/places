import React, { useRef, useState } from 'react';
import { Share, ScrollView, Linking, TouchableOpacity, Text, Image, StyleSheet, View, TextInput, Button, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import CachedImage from '../components/CachedImage'
import DisplayTypes from './DisplayTypes';
import CommentModal from './CommentModal';

const PlaceDetails = ({ item }) => {
    const [comment, setComment] = useState('');
    let carRef = useRef(null);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'React Native | A framework for building native apps using React',
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

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 0 }}>
                <CachedImage
                    style={{ height: 300, width: '100%', borderRadius: 10 }}
                    source={{
                        uri: item,

                    }}
                    cacheKey={`${item.docID}${index}`} />
            </View>
        );
    }

    return (
        <View style={[styles.item]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.name}>Daniel Zeglen</Text>
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
                <View style={{ flexDirection: 'row', width: 100 }}>
                    <Text>4</Text>
                    <TouchableOpacity>

                        <AntDesign name='smileo' size={25} color='grey' />
                    </TouchableOpacity>
                    <TouchableOpacity>

                        <AntDesign name='frowno' size={25} color='grey' style={{ paddingRight: 15, paddingLeft: 5 }} />
                    </TouchableOpacity>
                </View>


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