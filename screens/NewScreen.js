import React, { useContext, useState, useEffect } from 'react';
import {
    FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, RefreshControl,View
} from 'react-native';
import { UserContext } from '../providers/fire'
import { db } from '../fireconfig'
import PlaceCard from '../components/PlaceCard';

function NewScreen({navigation}) {

    const {currentAddress} = useContext(UserContext)
    const [selectedId, setSelectedId] = useState(null);
    const [postData, setPostData] = useState(null);
    const [refreshing, setRefreshing] = useState(false)
    const [lastDoc, setLastDoc] = useState(null);


    const renderItem = ({ item, index }) => {
        const backgroundColor = item.docID === selectedId ? 'white' : 'white';
        return (<PlaceCard item={item} onPress={() => setSelectedId(item.docID)} onNavigate={() => navigation.navigate('Details',{item:item})} style={{ backgroundColor }} />);
    };

    const _onRefresh = async () => {
        setRefreshing(true);
        await setData()
        setRefreshing(false);
    };


    async function fetchData() {
        let data = []
        const dataRef = db.collection('places')
        .where('city', '==', currentAddress.split(',')[0])
        .where('date','<', new Date())
        .orderBy('date', 'desc')
        

        const query = dataRef.limit(3)

        const snapshot = await query.get()

        if (snapshot.empty) {
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
        .where('city', '==', currentAddress.split(',')[0])
        .where('date','<', new Date())
        .orderBy('date', 'desc')

        const query = next.startAfter(lastDoc).limit(1)

        const getData = await query.get();
        if (getData.empty) {
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
   

    const handlePadinateState = async () => {
        const data = await handlePaginate()

        if (data) {
            setPostData(prev => [...prev, ...data])
        }

    }

    useEffect(() => {
        if(currentAddress){
            setData()
        }
        
    }, [currentAddress])

    return (
        <View style={styles.container}>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor:'#f0f0f0',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
export default NewScreen;