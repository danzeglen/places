import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import LoginModal from '../components/LoginModal';
import CreateModal from '../components/CreateModal'
import explore from './explore.png'
import { UserContext } from '../providers/fire'
import AntDesign from 'react-native-vector-icons/AntDesign';
import wooly from './wooly.png'
import wooly2 from './wooly2.png'

const ContentScreen = ({ navigation }) => {
    const { user, logout } = useContext(UserContext)
    const [loginModalVisable, setLoginModalVisable] = useState(false);
    const [createModalVisable, setCreateModalVisable] = useState(false);
    console.log(user)

    if (user) {
        return (
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: "center" }}>

                <SafeAreaView>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Hello, {user.displayName}</Text>
                    <View style={{ height: 300, width: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={wooly} style={{ height: 300, width: 300 }} />
                    </View>
                </SafeAreaView>
                <View style={{ paddingTop: 15, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius:20,borderTopRightRadius:20 }}>
                    <Text>default city</Text>
                    <Text style={{fontSize:25, paddingBottom:20}}>Cambridge, ON, CA</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                        <View style={{ width: '85%', height: 60, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderWidth: 0.7, borderColor: '#c9c9c9' }}>
                            <View style={{ marginLeft: 10, padding: 2, borderWidth: 0.7, borderColor: '#c9c9c9' }}>
                                <AntDesign name='star' size={32} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Login details</Text>
                                <Text style={{ opacity: 0.6, }}>Username, password, ect</Text>
                            </View>
                            <View>
                                <AntDesign name='right' size={22} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ width: '85%', height: 60, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderWidth: 0.7, borderColor: '#c9c9c9' }}>
                            <View style={{ marginLeft: 10, padding: 2, borderWidth: 0.7, borderColor: '#c9c9c9' }}>
                                <AntDesign name='star' size={32} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Reach out to developers</Text>
                                <Text style={{ opacity: 0.6, }}>Report bugs, reccomend features...</Text>
                            </View>
                            <View>
                                <AntDesign name='right' size={22} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ width: '85%', height: 60, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderWidth: 0.7, borderColor: '#c9c9c9' }}>
                            <View style={{ marginLeft: 10, padding: 2, borderWidth: 0.7, borderColor: '#c9c9c9' }}>
                                <AntDesign name='star' size={32} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Set default cities</Text>
                                <Text style={{ opacity: 0.6, }}>Username, password, ect</Text>
                            </View>
                            <View>
                                <AntDesign name='right' size={22} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ width: '85%', height: 60, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderWidth: 0.7, borderColor: '#c9c9c9' }}>
                            <View style={{ marginLeft: 10, padding: 2, borderWidth: 0.7, borderColor: '#c9c9c9' }}>
                                <AntDesign name='star' size={32} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Login details</Text>
                                <Text style={{ opacity: 0.6, }}>Username, password, ect</Text>
                            </View>
                            <View>
                                <AntDesign name='right' size={22} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={{paddingTop:20,paddingBottom:40, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity onPress={logout} style={{ width: '85%', height: 50, borderRadius: 10, backgroundColor: 'white' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#0244ad', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        )
    } else {


        return (
            <View style={styles.main}>
                <SafeAreaView style={{ flex: 0.6, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 30, paddingTop: 15 }}>Places</Text>
                    <Text style={{ paddingTop: 10, paddingBottom: 40, fontWeight: 'bold' }}>Share your favorite places with the world!</Text>

                    <View style={{ width: '90%', flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', borderRadius: 20 }}>
                        <Image source={wooly2}
                            style={{ width: 400, height: 400 }} />
                    </View>

                </SafeAreaView>
                <View style={{ flex: 0.4, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <LoginModal loginModalVisable={loginModalVisable} setLoginModalVisable={setLoginModalVisable} />
                    <CreateModal createModalVisable={createModalVisable} setCreateModalVisable={setCreateModalVisable} />
                </View>

            </View>
        );
    }
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