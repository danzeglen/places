import React,{useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import {UserContext} from '../providers/fire'
import {db} from '../fireconfig'

const ContactUsScreen = (props) => {
    const {user} = useContext(UserContext)
    const [feedback, setFeedback] = useState('')

    const handleFeedback = async () => {
        await db.collection('feedback').doc().set({
            content: feedback,
            user: user.uid,
            username: user.displayName
            
        })
        setFeedback('')
        
    }

    return (
        <View style={styles.main}>
            <Text style={{paddingBottom:10}}>Tell us about bugs, questions, or any features that you would like to see!</Text>
            <TextInput value={feedback} onChangeText={setFeedback} multiline={true} placeholder='message...' style={{borderWidth:0.5, height:100,width:300}} numberOfLines={3} /> 
            <Button title='Send' onPress={handleFeedback}/> 
            <Text>{user.uid}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        justifyContent: 'center',
        alignItems:'center',
        flex:0.6,
        backgroundColor:'white',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20
    }
});

export default ContactUsScreen;