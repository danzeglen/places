import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const LoginDetailScreen = (props) => {
    return (
        <View style={styles.main}>
            <View style={{marginTop:10, paddingLeft:10}}>
                <Text style={{paddingBottom:5}}>Email:</Text>
                <View style={styles.setting}>
                    <Text style={{flex:1,paddingLeft:10}}>Danielman99@msn.com</Text>
                    
                </View>
            </View>
            <View style={{marginTop:10,paddingLeft:10}}>
                <Text style={{paddingBottom:5}}>Display Name:</Text>
                <View style={styles.setting}>
                    <Text style={{flex:1,paddingLeft:10}}>Daniel Zeglen</Text>
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'baseline'
    },
    setting: {
        marginLeft: 10,
        width: 300,
        backgroundColor: 'white',
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection:'row',
    }
});

export default LoginDetailScreen;