import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image, Linking, TextInput, TouchableOpacity, Switch } from 'react-native'
import { UserContext } from '../providers/fire'
import { FontAwesome } from '@expo/vector-icons';
import { db, fire } from '../fireconfig'
import GooglePlacesInput from '../components/GooglePlaces'
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import UploadButton from '../components/UploadButton';
import TypeModal from '../components/TypeModal';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingModal from '../components/LoadingModal';
import SuccessModal from '../components/SuccessModal';

const PostScreen = ({ navigation }) => {
    const [image, setImage] = useState([]);
    const [location, setLocation] = useState(null); //also apart of auto local
    const [currentPressed, setCurrentPress] = useState(false); //checks to see if user is inputing adress or if we auto
    const [address, setAddress] = useState(null); //for the use of current address
    const [errorMsg, setErrorMsg] = useState(null);
    const [inputedAddress, setInputedAddress] = useState(null) //user inputed address
    const [title, setTitle] = useState('');
    const [isloading, setIsLoading] = useState(false) //FOR HANDLING LOAD
    const [modalVisible, setModalVisible] = useState(false); //SHOWS LOADING MODAL
    const [successVisible, setSuccessVisible] = useState(false); //SHOWS LOADING MODAL
    const [type, setType] = useState({ free: false, food: false, under15: false, datespot: false, group: false, outdoors: false, lake: false, entertainment: false });
    const [description, setDescription] = useState('');
    const { user } = useContext(UserContext)
    const [isEnabled, setIsEnabled] = useState(false);
    const googleRef = useRef(null)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    async function uploadImageAsync() {
        console.log('STARTED')
        setModalVisible(true);
        setIsLoading(true);
        let downloadURLS = [];

        await Promise.all(image.map(async (img, index) => {
            console.log(img)
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", img, true);
                xhr.send(null);
            });
            const date = new Date().toString()
            console.log(date)
            const ref = fire.storage().ref().child(`${user.uid}/${date}/image` + index);
            const snapshot = await ref.put(blob);

            // We're done with the blob, close and release it
            blob.close();
            let url = await snapshot.ref.getDownloadURL()
            let inx = url.indexOf('image')
            downloadURLS.push(url.slice(0, inx + 6) + '_640x640' + url.slice(inx + 6, url.length));
        }))
        if (inputedAddress) {

            console.log(inputedAddress)
            await db.collection('places').add({
                useruid: user.uid,
                displayName: user.displayName,
                title: title,
                description: description,
                lat: inputedAddress.geometry.location.lat,
                lng: inputedAddress.geometry.location.lng,
                formattedAddr: inputedAddress.formatted_address,
                city: inputedAddress.address_components[3].long_name,
                province: inputedAddress.address_components[5].long_name,
                country: inputedAddress.address_components[6].long_name,
                zip: inputedAddress.address_components[7].long_name,
                free: type.free,
                food: type.food,
                under15: type.under15,
                group: type.group,
                datesport: type.datespot,
                outdoors: type.outdoors,
                lake: type.lake,
                entertainment: type.entertainment,
                imgs: downloadURLS,
                date: new Date(),
                fuck: 'Fuck you Daniel',
                likes: 0
            })
        }
        console.log('DONE')
        setModalVisible(false)
        setSuccessVisible(true)
    }

    const cancel = () => {
        setTitle('');
        googleRef.current.clear();
        setDescription('');
        setImage([])
        setType({ free: false, food: false, under15: false, datespot: false, group: false, outdoors: false, lake: false, entertainment: false })
    }

    const getLocation = async () => {
        setCurrentPress(true);
        console.log('ran')
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync(location.coords);
        console.log(location.coords)
        console.log(address)
        setAddress(address)
        setLocation(location);
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(prev => [...prev, result.uri]);
        }
    };
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (address) {
        text = address[0].name + ', ' + address[0].city + ', ' + address[0].region;
    }
    console.log(Object.keys(type).length)

    if (user) {

        return (
            <ScrollView
                listViewDisplayed={false}
                keyboardShouldPersistTaps='always'>
                <View style={styles.main}>
                    <LoadingModal modalVisible={modalVisible} setModalVisible={setModalVisible} isloading={isloading} navigation={navigation} />
                    <SuccessModal successVisible={successVisible} setSuccessVisible={setSuccessVisible} isloading={isloading} navigation={navigation} />
                    <View style={{ width: '100%' }}>
                        <View style={{ height: 40 }}><Text style={{ fontSize: 20 }}>Input your place location:</Text></View>
                        <View style={{ height: 54 }}></View>
                        {currentPressed ?
                            <View style={{ width: '100%', backgroundColor: 'white', height: 54, position: 'absolute', marginTop: 20, justifyContent: 'center' }}>

                                <Text style={{ fontSize: 20, paddingLeft: 5, color: 'grey' }}>{text}</Text>
                            </View>
                            : <GooglePlacesInput setInputedAddress={setInputedAddress} googleRef={googleRef} />
                        }
                        <View>
                            {currentPressed ?
                                <Button title='Input custom location' onPress={() => setCurrentPress(value => !value)} />
                                : <Button title='Or use your current location' onPress={getLocation} style={{ fontSize: 20 }} />}
                        </View>
                        <View style={styles.icontainer}>
                            {image && image.map((img, index) => {
                                return (
                                    <Image key={index} source={{ uri: img }} style={{ margin: 5, width: 100, height: 100 }} />
                                )
                            })}
                            <UploadButton onPress={pickImage} />

                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', borderRadius: 15, marginTop: 15 }}>
                            <FontAwesome style={{ paddingLeft: 10 }} name='pencil' size={25} color='grey' />
                            <TextInput
                                placeholder='post title..'
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}></TextInput>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', borderRadius: 15, marginTop: 15 }}>
                            <FontAwesome style={{ paddingLeft: 10, paddingRight: 10 }} name='file-o' size={25} color='grey' />
                            <TextInput
                                multiline={true}
                                numberOfLines={2}
                                blurOnSubmit={true}
                                placeholder='Description...'
                                style={styles.description}
                                value={description}
                                onChangeText={setDescription}></TextInput>
                        </View>

                        <View style={{ flexWrap: 'wrap', width: 'auto', flexDirection: 'row', backgroundColor: 'white', borderRadius: 15, marginTop: 15 }}>
                            <TypeModal setType={setType} type={type} />
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 15, alignItems: 'center', width: 190, borderRadius: 15 }}>
                            <Text style={{ padding: 15, fontSize: 15 }}>Is parking paid?</Text>
                            <Switch

                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />

                        </View>

                    </View>


                    <View style={{ width: '100%', marginBottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={uploadImageAsync} style={{ justifyContent: 'center', height: 50, width: '70%', flexDirection: 'row', backgroundColor: 'dodgerblue', alignItems: 'center', borderRadius: 15, marginTop: 15 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancel} style={{ justifyContent: 'center', height: 40, width: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 15, marginTop: 15 }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        );
    } else {

        return(
            <View style={{justifyContent:'center', flex:1, alignItems:'center'}}> 
                <Text>Uh oh, you tried to post a place but are not logged in!</Text>
                <Button title='login' onPress={() => navigation.navigate('Account')}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    main: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        marginBottom: 90,
        backgroundColor: '#f7f7f7'
    },
    imgcont: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: 'yellow',
    },
    icontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',

    },
    input: {
        width: '80%',
        height: 40,
        fontSize: 20,
        borderWidth: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
    },
    description: {
        width: '80%',
        height: 80,
        fontSize: 17,
    },
    type: {
        height: 50
    }



})

export default PostScreen;