import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View, SafeAreaView, Button, Alert, Image } from 'react-native';
import Navigator from '../FirstApp/routes/HomeStack'
import IconButton from './components/IconButton'
import { FireProvider } from './providers/fire'
import MaskedView from '@react-native-community/masked-view';

export default function App() {
  const [buttonPressed, setButtonPressed] = useState('')
  const [loading, setLoading] = useState(new Animated.Value(0))
  const [animationDone, setAnimationDone] = useState(false);
  const colorLayer = animationDone ? null : (<View style={[StyleSheet.absoluteFill, { backgroundColor: '#005d8f' }]} />)
  const WhiteLayer = animationDone ? null : (<View style={[StyleSheet.absoluteFill, { backgroundColor: 'white' }]} />)
  const imageScale = {
    transform: [
      {
        scale: loading.interpolate({
          inputRange: [0, 15, 100],
          outputRange: [0.1, 0.06, 16]
        })
      }
    ]
  }

  const opacity = {
    opacity: loading.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
  }
  useEffect(() => {
    Animated.timing(loading, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
      delay: 400
    }).start(() => {
      setAnimationDone(true)
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {colorLayer}

      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Animated.Image source={require("./assets/icon3.png")}
              style={[{ width: 10000 }, imageScale]}
              resizeMode="contain" />
          </View>
        }      >
        {WhiteLayer}
        <Animated.View style={[opacity, styles.centered],{width:'100%'}}>
          <FireProvider>
            <Navigator style={styles.content} />
          </FireProvider>
        </Animated.View>

      </MaskedView>
    </View>
  )

  // return (
  //   
  // );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 0.9
  },


});
