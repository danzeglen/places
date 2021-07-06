import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({setInputedAddress,googleRef}) => {
    return (
        <GooglePlacesAutocomplete
            ref={googleRef}
            placeholder="Search..."
            placeholderTextColor="#333"
            onPress={(data, details) => {
                setInputedAddress(details)
               
            }}
            query={{
                key: "AIzaSyDkpUBwHzSsnx5knQboJTjh4sw-FPn7uOM",
                language: "en"
            }}
            textInputProps={{
                autoCapitalize: "none",
                autoCorrect: false
            }}
            fetchDetails={true}
            listViewDisplayed='auto'
            enablePoweredByContainer={true}
            styles={{
                container: {
                    zIndex: 1,
                    position: 'absolute',
                    marginTop: 40,
                    width: "100%"
                },

                textInput: {
                    height: 54,
                    margin: 0,
                    borderRadius: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    fontSize: 18
                },

                description: {
                    fontSize: 16
                },
                row: {
                    zIndex: 1,
                    padding: 20,
                    height: 58
                }
            }}
        />
    );
};
export default GooglePlacesInput;