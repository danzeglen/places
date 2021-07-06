import React from 'react';
import { View, Text, TouchableOpacity, Alert ,StyleSheet} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

function IconButton({ icon, color, onPress }) {

    return (
        <TouchableOpacity onPress={onPress}>
            <View  style={{width: 50, height: 50, borderRadius: 10, margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome name={icon} size={32} color={color} />
            </View>
        </TouchableOpacity>
    );
}

export default IconButton;