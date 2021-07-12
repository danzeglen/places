import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoogleCities from './GoogleCities';

const SearchModal = ({ setCurrentAddress, currentAddress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState(null);
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: 20, backgroundColor: 'green', position: 'relative' }}>
            </View>
            <Text style={styles.modalText}>Search a city!</Text>

            <GoogleCities setSelectedAddr={setSelectedAddr} />

            <View style={{flexDirection:'row'}}> 

            <TouchableHighlight
              style={{ ...styles.openButton}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Go back</Text>
            </TouchableHighlight>
            <Button title='save' onPress={() => { setCurrentAddress(selectedAddr); setModalVisible(!modalVisible) }}></Button>
            </View>
          </View>
        </View>
      </Modal>

      
      <TouchableOpacity onPress={() => {
          setModalVisible(true);
          
        }}
        style={{flexDirection:'row',}}>
        <Text numberOfLines={1} style={{color:'dodgerblue',flexShrink:1, fontSize:18}}>{currentAddress}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-end'
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    width: '100%',
    height: '60%',
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SearchModal