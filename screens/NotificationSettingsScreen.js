import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

const NotificationSettingsScreen = (props) => {
    return (
        <View style={styles.main}>
            <Text>Notifications are still in development</Text>  
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default NotificationSettingsScreen;