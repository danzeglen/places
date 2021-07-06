import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

function Card(props) {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.header}>Fonte's Sandwhich Shop</Text>
            </View>
            <View style={styles.content}>
                <Image
                    style={styles.img}
                    source={{
                        uri: 'https://pyxis.nymag.com/v1/imgs/65a/265/4d4a8e66a2fa46365db08d586a2c997f76-defontes-01.rsocial.w1200.jpg'
                    }}
                />
                <View style={styles.sidecontainer}>
                <Image
                    style={styles.sideimg}
                    source={{
                        uri: 'https://pyxis.nymag.com/v1/imgs/65a/265/4d4a8e66a2fa46365db08d586a2c997f76-defontes-01.rsocial.w1200.jpg'
                    }}
                />
                <Image
                    style={styles.sideimg}
                    source={{
                        uri: 'https://pyxis.nymag.com/v1/imgs/65a/265/4d4a8e66a2fa46365db08d586a2c997f76-defontes-01.rsocial.w1200.jpg'
                    }}
                />
    
                </View>
            </View>
            <View style={{flex: 0.2}}>

            <Text>7 Melran Drive</Text>
           <Text>Honestly so much fun </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 300,
        width: '100%',
        padding: 10,
        backgroundColor: '#f0f0f0',
        shadowColor:'black',
        shadowOffset: {
            width: 8,
            height: 10
          },
        shadowOpacity:0.3,
        shadowRadius:10,
        
    },
    header: {
        fontSize: 20,
    },
    img: {
        flex: 0.7,
        height: '100%',
        borderRadius: 15,
    },
    sideimg:{
        height: '45%',
        borderRadius: 15,
    },
    sidecontainer:{
        flex: 0.5,
        justifyContent:'space-between',
        marginLeft: 10,
        flexDirection:'column',
    },  
    content: {
        flex: 0.8,
        flexDirection: 'row',
    }

})

export default Card;