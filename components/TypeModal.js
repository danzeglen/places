import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const TypeModal = ({ setType, type }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [counter, setCounter] = useState(0);
    const [displayTypes, setDisplayTypes] = useState();
    let trueCount = Object.values(type).reduce((a, type) => a + type, 0)

    const HandledisplayTypes = () => {
        let displayArray = []
        for (const [key, value] of Object.entries(type)) {
            if (value === true) {
                console.log(`${key}: ${value}`);
                if (key === 'food') {
                    displayArray.push(
                        <View key={key} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', padding: 5, margin: 5, borderRadius: 10, flexDirection: 'row' }}>
                            <Ionicons style={{ padding: 2 }} name='fast-food' size={20} color='white' />
                            <Text style={{ padding: 5, fontSize: 15, color: 'white' }}>
                                {key}
                            </Text>
                        </View>)
                } else if (key === 'free') {
                    displayArray.push(
                        <View key={key} style={{ backgroundColor: '#5d6ed9', padding: 5, margin: 5, borderRadius: 10, flexDirection: 'row' }}>
                            <Ionicons style={{ padding: 2 }} name='basketball' size={20} color='white' />
                            <Text style={{ padding: 5, fontSize: 15, color: 'white' }}>
                                {key}
                            </Text>
                        </View>)
                } else if (key === 'under15') {
                    displayArray.push(
                        <View key={key} style={{ backgroundColor: '#529144', flexDirection: 'row', padding: 5, margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons style={{ padding: 2 }} name='cash' size={20} color='white' />
                            <Text style={{ padding: 5, fontSize: 15, color: 'white' }}>
                                {key}
                            </Text>
                        </View>)
                }
                else if (key === 'datespot') {
                    displayArray.push(
                        <View key={key} style={{ backgroundColor: '#d95f67', flexDirection: 'row', padding: 5, margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons style={{ padding: 2 }} name='heart' size={20} color='white' />
                            <Text style={{ padding: 5, fontSize: 15, color: 'white' }}>
                                {key}
                            </Text>
                        </View>)
                }
                else if (key === 'group') {
                    displayArray.push(
                        <View key={key} style={{ backgroundColor: '#9c63ff', flexDirection: 'row', padding: 5, margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons style={{ padding: 2 }} name='beer' size={20} color='white' />
                            <Text style={{ padding: 5, fontSize: 15, color: 'white' }}>
                                {key}
                            </Text>
                        </View>)
                }
                else if (key === 'outdoors') {
                    displayArray.push(
                        <View key={key} style={{ backgroundColor: '#87663a', flexDirection: 'row', padding: 5, margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons style={{ padding: 2 }} name='bonfire' size={20} color='white' />
                            <Text style={{ padding: 5, fontSize: 15, color: 'white' }}>
                                {key}
                            </Text>
                        </View>)
                }
                else if (key === 'lake') {
                    displayArray.push(
                        <View key={key} style={{ backgroundColor: '#314cf7', flexDirection: 'row', padding: 5, margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons style={{ padding: 2 }} name='water' size={20} color='white' />
                            <Text style={{ padding: 5, fontSize: 15, color: 'white' }}>
                                {key}
                            </Text>
                        </View>)
                }
                else if (key === 'entertainment') {
                    displayArray.push(
                        <View key={key} style={{ backgroundColor: 'red', flexDirection: 'row', padding: 5, margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons style={{ padding: 2 }} name='game-controller' size={20} color='white' />
                            <Text style={{ padding: 5, fontSize: 15, color: 'white' }}>
                                {key}
                            </Text>
                        </View>)
                }
            }
        }
        return (displayArray)
    }

    const handleClickFree = () => {
        console.log('^^')
        if (trueCount === 3) {
            console.log('in here')
            setType({ ...type, free: false })
        } else {
            console.log('in else')
            setType({ ...type, free: !type.free })
        }
    }
    const handleClickFood = () => {
        let trueCount = Object.values(type).reduce((a, type) => a + type, 0)
        console.log('^^')
        if (trueCount === 3) {
            console.log('in here')
            setType({ ...type, food: false })
        } else {
            console.log('in else')
            setType({ ...type, food: !type.food })
        }
    }
    const handleClickUnder15 = () => {
        let trueCount = Object.values(type).reduce((a, type) => a + type, 0)
        console.log('^^')
        if (trueCount === 3) {
            console.log('in here')
            setType({ ...type, under15: false })
        } else {
            console.log('in else')
            setType({ ...type, under15: !type.under15 })
        }
    }
    const handleClickDatespots = () => {
        let trueCount = Object.values(type).reduce((a, type) => a + type, 0)
        console.log('^^')
        if (trueCount === 3) {
            console.log('in here')
            setType({ ...type, datespot: false })
        } else {
            console.log('in else')
            setType({ ...type, datespot: !type.datespot })
        }
    }
    const handleClickGroup = () => {
        let trueCount = Object.values(type).reduce((a, type) => a + type, 0)
        console.log('^^')
        if (trueCount === 3) {
            console.log('in here')
            setType({ ...type, group: false })
        } else {
            console.log('in else')
            setType({ ...type, group: !type.group })
        }
    }
    const handleClickOutdoors = () => {
        let trueCount = Object.values(type).reduce((a, type) => a + type, 0)
        console.log('^^')
        if (trueCount === 3) {
            console.log('in here')
            setType({ ...type, outdoors: false })
        } else {
            console.log('in else')
            setType({ ...type, outdoors: !type.outdoors })
        }
    }
    const handleClickLake = () => {
        let trueCount = Object.values(type).reduce((a, type) => a + type, 0)
        console.log('^^')
        if (trueCount === 3) {
            console.log('in here')
            setType({ ...type, lake: false })
        } else {
            console.log('in else')
            setType({ ...type, lake: !type.lake })
        }
    }
    const handleClickEntertainment = () => {
        let trueCount = Object.values(type).reduce((a, type) => a + type, 0)
        console.log('^^')
        if (trueCount === 3) {
            console.log('in here')
            setType({ ...type, entertainment: false })
        } else {
            console.log('in else')
            setType({ ...type, entertainment: !type.entertainment })
        }
    }


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select a Catagory</Text>
                        <Text>{Object.values(type).reduce((a, type) => a + type, 0)} / 3</Text>


                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleClickFree()} style={styles.typecontainer}>
                                {type.free ?
                                    <View style={[styles.typecircle, styles.typecircleclicked, { backgroundColor: '#5d6ed9' }]}>
                                        <Ionicons name='basketball' size={60} color='white' />
                                    </View>
                                    : <View style={[styles.typecircle, { backgroundColor: '#5d6ed9' }]} >
                                        <Ionicons name='basketball' size={60} color='white' />
                                    </View>}
                                <Text style={{ color: 'black' }}>Free</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleClickFood()} style={styles.typecontainer}>
                                {type.food ?
                                    <View style={[styles.typecircle, styles.typecircleclicked, { backgroundColor: 'orange' }]}>
                                        <Ionicons name='fast-food' size={60} color='white' />
                                    </View>
                                    : <View style={[styles.typecircle, { backgroundColor: 'orange' }]} >
                                        <Ionicons name='fast-food' size={60} color='white' />
                                    </View>}
                                <Text style={{ color: 'black' }}>Food</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleClickUnder15()} style={styles.typecontainer}>
                                {type.under15 ?
                                    <View style={[styles.typecircle, styles.typecircleclicked, { backgroundColor: '#529144' }]}>
                                        <Ionicons name='cash' size={60} color='white' />
                                    </View>
                                    : <View style={[styles.typecircle, { backgroundColor: '#529144' }]} >
                                        <Ionicons name='cash' size={60} color='white' />
                                    </View>}
                                <Text style={{ color: 'black' }}>Under $15</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleClickDatespots()} style={styles.typecontainer}>
                                {type.datespot ?
                                    <View style={[styles.typecircle, styles.typecircleclicked, { backgroundColor: '#d95f67' }]}>
                                        <Ionicons name='heart' size={60} color='white' />
                                    </View>
                                    : <View style={[styles.typecircle, { backgroundColor: '#d95f67' }]} >
                                        <Ionicons name='heart' size={60} color='white' />
                                    </View>}
                                <Text style={{ color: 'black' }}>Date Spots</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleClickGroup()} style={styles.typecontainer}>
                                {type.group ?
                                    <View style={[styles.typecircle, styles.typecircleclicked, { backgroundColor: '#9c63ff' }]}>
                                        <Ionicons name='beer' size={60} color='white' />
                                    </View>
                                    : <View style={[styles.typecircle, { backgroundColor: '#9c63ff' }]}>
                                        <Ionicons name='beer' size={60} color='white' />
                                    </View>}
                                <Text style={{ color: 'black' }}>Group</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleClickOutdoors()} style={styles.typecontainer}>
                                {type.outdoors ?
                                    <View style={[styles.typecircle, styles.typecircleclicked, { backgroundColor: '#87663a' }]}>
                                        <Ionicons name='bonfire' size={60} color='white' />
                                    </View>
                                    : <View style={[styles.typecircle, { backgroundColor: '#87663a' }]}>
                                        <Ionicons name='bonfire' size={60} color='white' />
                                    </View>}
                                <Text style={{ color: 'black' }}>Outdoors</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleClickLake()} style={styles.typecontainer}>
                                {type.lake ?
                                    <View style={[styles.typecircle, styles.typecircleclicked, { backgroundColor: '#314cf7' }]}>
                                        <Ionicons name='water' size={60} color='white' />
                                    </View>
                                    : <View style={[styles.typecircle, { backgroundColor: '#314cf7' }]} >
                                        <Ionicons name='water' size={60} color='white' />
                                    </View>}
                                <Text style={{ color: 'black' }}>Lake/River</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleClickEntertainment()} style={styles.typecontainer}>
                                {type.entertainment ?
                                    <View style={[styles.typecircle, styles.typecircleclicked, { backgroundColor: 'red' }]}>
                                        <Ionicons name='game-controller' size={60} color='white' />
                                    </View>
                                    : <View style={[styles.typecircle, { backgroundColor: 'red' }]}>
                                        <Ionicons name='game-controller' size={60} color='white' />
                                    </View>}
                                <Text style={{ color: 'black' }}>Entertainment</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Done</Text>
                        </TouchableHighlight>


                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>

                    <FontAwesome style={{ paddingRight: 10 }} name='list' size={25} color='grey' />
                    {trueCount > 0 ?
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>


                            <HandledisplayTypes />
                        </View>

                        :
                        <Text style={styles.textStyle}>Select Type</Text>}
                </View>
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
        width: '100%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
        backgroundColor: 'white',
        flexWrap: 'wrap',
        width: '100%',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 25,
    },
    typecontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    type: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 50,
        width: 100,
        height: 100,
        alignItems: 'center'
    },
    typecircle: {
        padding: 10,
        borderRadius: 50,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typecircleclicked: {
        borderWidth: 3,
        borderColor: 'blue',
    },
    typetext: {
        padding: 5,
        margin: 5,
    }
});

export default TypeModal