import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import phone from './phone.png'

function NotificationScreen(props) {
    return (
        <View style={styles.main}>
            <SafeAreaView>
                <Text style={{fontWeight:'bold',fontSize:20}}>Notifications</Text>
                
            </SafeAreaView>
            <Text style={{color:'grey'}}>You must have an account to recive notifications</Text>
            <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
                <Image source={phone} style={{height:100,width:120}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});

export default NotificationScreen;