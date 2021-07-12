import React, {useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Button } from 'react-native';
import phone from './phone.png'
import { db } from '../fireconfig'
import { UserContext } from '../providers/fire'

function NotificationScreen(props) {
    const { currentAddress } = useContext(UserContext)
    let lastweek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)


    const handleQ = async () => {
        const dataRef = db.collection('places').where('city', '==', currentAddress.split(',')[0])
            
        dataRef.where('date', '>', lastweek)
        dataRef.orderBy('date', 'desc')
        dataRef.orderBy('likes','desc')


        const snapshot = await dataRef.get()
            .then((res) => {console.log(res)})
            .catch((err) => {console.log(err)})



    }


    return (
        <View style={styles.main}>
            <SafeAreaView>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Notifications</Text>

            </SafeAreaView>
            <Text style={{ color: 'grey' }}>You must have an account to recive notifications</Text>
            <Button title='click me' onPress={handleQ}/>
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