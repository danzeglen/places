import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity,Image } from 'react-native'
import LoginModal from '../components/LoginModal';
import CreateModal from '../components/CreateModal'
import explore from './explore.png'

const ContentScreen = (props) => {
    const [loginModalVisable, setLoginModalVisable] = useState(false);
    const [createModalVisable, setCreateModalVisable] = useState(false);

    return (
        <View style={styles.main}>
            <SafeAreaView style={{ flex: 0.6,width:'100%',alignItems:'center',justifyContent:'space-between' }}>
                <Text style={{fontSize:30,paddingTop:15}}>Places</Text>
                <Text style={{paddingTop:10, paddingBottom: 40, fontWeight:'bold' }}>Share your favorite places with the world!</Text>

                <View style={{width: '90%',flex:1,justifyContent:'flex-end',alignItems:'center', backgroundColor:'white',borderRadius:20}}>
                    <Image source={explore}
                    style={{width:300,height:300}}/>
                </View>

            </SafeAreaView>
            <View style={{ flex: 0.4, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <LoginModal loginModalVisable={loginModalVisable} setLoginModalVisable={setLoginModalVisable}/>
                <CreateModal createModalVisable={createModalVisable} setCreateModalVisable={setCreateModalVisable}/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
    },

})

export default ContentScreen;