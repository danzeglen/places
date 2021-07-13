import React, {useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Button } from 'react-native';
import phone from './phone.png'
import { db } from '../fireconfig'
import { UserContext } from '../providers/fire'

function NotificationScreen(props) {
    const { currentAddress } = useContext(UserContext)


    return (
        <View style={styles.main}>
            <SafeAreaView>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Notifications</Text>

            </SafeAreaView>
            <Text style={{ color: 'grey' }}>Still in development</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Image source={phone} style={{ height: 100, width: 120 }} />
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