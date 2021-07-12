import React from 'react';
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const DisplayTypes = ({ under15, datespot, entertainment, food, free, group, lake, outdoors, }) => {
    let displayArray = []
    if (food) {
        displayArray.push(
            { type: 'food', icon: 'fast-food', color: 'orange' })
    } 
    if (free) {
        displayArray.push(
            { type: 'free', icon: 'basketball', color: '#5d6ed9' })
    } 
    if (under15) {
        displayArray.push(
            { type: 'under15', icon: 'cash', color: '#529144' })
    }
    if (datespot) {
        displayArray.push(
            { type: 'datespot', icon: 'heart', color: '#d95f67' })
    }
    if (group) {
        displayArray.push(
            { type: 'group', icon: 'beer', color: '#9c63ff' })
    }
    if (outdoors) {
        displayArray.push(
            { type: 'outdoors', icon: 'bonfire', color: '#87663a' })
    }
    if (lake) {
        displayArray.push(
            { type: 'lake', icon: 'water', color: '#314cf7' })
    }
    if (entertainment) {
        console.log('AT ent')
        displayArray.push(
            { type: 'entertainment', icon: 'game-controller', color: 'red' })
    }
    return (
        <View style={{ flexDirection: 'row', paddingTop:5,flexWrap:'nowrap' }}>
            {displayArray.map((e) => {
                return (
                    <View key={e.type} style={{ flexDirection: 'row', backgroundColor: e.color, paddingBottom:2,paddingTop:2,paddingLeft:5,paddingRight:10, borderRadius: 10,marginRight:5 }}>
                        <Ionicons name={e.icon} size={20} color={'white'} />
                        <Text style={{ fontSize: 15, color:'white',paddingLeft:5 }}>{e.type}</Text>
                    </View>
                )
            })}
        </View>
    )

}

export default DisplayTypes;