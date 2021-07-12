import React, { useContext, useState, useEffect } from 'react';
import {
    FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, RefreshControl, View, Animated
} from 'react-native';
import { UserContext } from '../providers/fire'
import { db } from '../fireconfig'
import PlaceCard from '../components/PlaceCard';
import firebase from 'firebase'
import Wooly4 from './Wooly4.png'
import PlaceSavedCard from '../components/PlaceSavedCard'


function TrendingScreen({ navigation }) {

    const { currentAddress, user, userDetails, setUserDetails } = useContext(UserContext)
    const [selectedId, setSelectedId] = useState(null);
    const [postData, setPostData] = useState(null);
    const [refreshing, setRefreshing] = useState(false)
    const [lastDoc, setLastDoc] = useState(null);


    const renderItem = ({ item, index }) => {

        const backgroundColor = item.docID === selectedId ? 'white' : 'white';
        return (
            
                <PlaceSavedCard setPostData={setPostData} postData={postData} item={item} onPress={() => setSelectedId(item.docID)} onNavigate={() => navigation.navigate('Details', { item: item })} style={{ backgroundColor }} />
                            );
    };


    const _onRefresh = async () => {
        console.log('_onRefresh')
        setRefreshing(true);
        await setData()
        setRefreshing(false);
    };

    async function fetchData() {
        let data = []
        console.log(userDetails)
        console.log('^^^^^^THIS IS SAVED PLACES USER DETAILS^^^')
        const dataRef = db.collection('places')
            .where(firebase.firestore.FieldPath.documentId(), 'in', userDetails.favorites)
        const query = dataRef.limit(3);
        const snapshot = await dataRef.get()

        if (snapshot.empty) {
            console.log('NADA');
            return;
        }
        snapshot.forEach(doc => {
            setLastDoc(doc)
            let tempDoc = doc.data()
            tempDoc['docID'] = doc.id
            data.push(tempDoc)
        })
        return data
    }
  

    async function setData() {
        const data = await fetchData()
        setPostData(data)

    }


    async function handlePaginate() {
        let data = [];
        const last = postData[postData.length - 1];
        const next = db.collection('places')
            .where(firebase.firestore.FieldPath.documentId(), 'in', userDetails.favorites)
            .startAfter(lastDoc)
        const query = next.limit(1);

        const getData = await query.get();
        if (getData.empty) {
            console.log('NADAWADA');
            return;
        }
        getData.forEach(doc => {
            setLastDoc(doc)
            let tempDoc = doc.data()
            tempDoc['docID'] = doc.id
            data.push(tempDoc)
        })

        return data
    }
    if (postData) {
        console.log(postData.length)
    }



    const handlePadinateState = async () => {
        console.log('ran')
        const data = await handlePaginate()

        if (data) {
            setPostData(prev => [...prev, ...data])
        }

    }

    useEffect(() => {
        if (userDetails) {
            setData()
        }

    }, [userDetails])

    if (user) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Saved Places</Text>
                </SafeAreaView>
                {postData ?
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing}
                                onRefresh={_onRefresh} tintColor="#F8852D" />
                        }
                        data={postData}
                        renderItem={renderItem}
                        enableEmptySections={true}

                        keyExtractor={(item, index) => { return index.toString(); }}
                        extraData={selectedId}
                        onEndReachedThreshold={0.5}
                        onEndReached={handlePadinateState}
                    />
                    : <Text>No data</Text>
                }
            </View>
        );
    } else {
        return (
            <View style={styles.main}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Saved Places</Text>
                </SafeAreaView>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ marginBottom: 40, fontWeight: 'bold', fontSize: 20 }}>You must be logged in to save places!</Text>
                    <Image source={Wooly4} style={{ height: 450, width: 370 }} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#f0f0f0',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});
export default TrendingScreen;