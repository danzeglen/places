import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native'
import SearchModal from '../components/SearchModal'
import { UserContext } from '../providers/fire'
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
const Header = (props) => {
    let [fontsLoaded] = useFonts({
        'OtomanopeeOne': require('../assets/fonts/Otomanpee.ttf')
      });


    const { currentAddress, setCurrentAddress } = useContext(UserContext)

    useEffect(() => {
        
    }, [])



    return (

        <View style={[styles.header, styles.shadow]}>
            {fontsLoaded ?
            <View style={{width: 100 }}>
                <Image source={require('./pin.png')} style={{height:40,width:40, borderRadius:10,marginLeft:20}}/>
            </View>
            : <Text></Text>}
            <SearchModal currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />
            <View style={{width: 100, justifyContent:'flex-end',alignItems:"flex-end",paddingRight:20 }} >

                <Ionicons name="ellipsis-vertical-sharp" size={24} color="black" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',



    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.5,
        elevation: 5,
    }

})
export default Header;