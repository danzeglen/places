import React from 'react';
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const DisplayTypes = ({ under15, datespot, entertainment, food, free, group, lake, outdoors, }) => {
    let displayArray = []
    if (food) {
        displayArray.push(
            { type: 'food', icon: 'flower', color: 'blue' })
    } 
    if (free) {
        displayArray.push(
            { type: 'free', icon: 'flower', color: 'blue' })
    } 
    if (under15) {
        displayArray.push(
            { type: 'under15', icon: 'flower', color: 'blue' })
    }
    if (datespot) {
        console.log('AT DATE')
        displayArray.push(
            { type: 'datespot', icon: 'heart', color: '#ff3d40' })
    }
    if (group) {
        displayArray.push(
            { type: 'group', icon: 'flower', color: 'blue' })
    }
    if (outdoors) {
        displayArray.push(
            { type: 'outdoors', icon: 'flower', color: 'blue' })
    }
    if (lake) {
        console.log('AT LAKE')
        displayArray.push(
            { type: 'lake', icon: 'water', color: '#7796d4' })
    }
    if (entertainment) {
        console.log('AT ent')
        displayArray.push(
            { type: 'entertainment', icon: 'game-controller', color: '#ffbb3d' })
    }
    return (
        <View style={{ flexDirection: 'row', paddingTop:5 }}>
            {displayArray.map((e) => {
                return (
                    <View key={e.type} style={{ flexDirection: 'row', backgroundColor: e.color, paddingBottom:2,paddingTop:2,paddingLeft:5,paddingRight:10, borderRadius: 10,marginRight:5 }}>
                        <Ionicons name={e.icon} size={20} color={'white'} />
                        <Text style={{ fontSize: 17, color:'white',paddingLeft:5 }}>{e.type}</Text>
                    </View>
                )
            })}
        </View>
    )

}

export default DisplayTypes;