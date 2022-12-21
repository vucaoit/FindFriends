/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, SafeAreaView, Button, PermissionsAndroid, Alert, FlatList } from 'react-native';
import { getDistance, getPreciseDistance } from 'geolib';

import {
  GoogleSignin,
  GoogleSigninButton,
  User,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
// import Firebase from './src/environment/config';
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '884481985226-f1s678ai01uk10tlsllarb6jrvhv0d62.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
interface Location {
  email: string,
  data: {
    latitude: number,
    longitude: number
  }
}
// Initialize Firebase
// Function to get permission for location
// const userTableReference = Firebase.database().ref('users');
// const healthTipReferences = Firebase.firestore().collection('location').doc("UDjTV4x9x2Cgfsg4Aqsc");
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const App = () => {
  const [user, setUser] = useState<User>();
  const [location, setLocation] = useState(false);
  const [data, setData] = useState<Location[]>([]);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      console.log(userInfo)
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const updateLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            // console.log(position);
            setLocation(position);
            if (location) {
              firestore()
                .collection('location')
                .doc(user?.user.email)
                .set({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                })
                .then(() => {
                  Alert.alert("Thong bao", "Cap nhat vi tri thanh cong!");
                }).catch((er) => {
                  console.log(er);
                });
            }

          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    console.log(location);
  };
  const getAllLocation = async () => {

    try {
      const user1 = await firestore().collection('location').get();
      const temp: Location[] = [];
      user1.docs.forEach(item => {
        console.log(item.data());
        temp.push({
          email: item.id,
          data: {
            latitude: item.data().latitude,
            longitude: item.data().longitude
          }
        })
      })
      setData(temp)
      // setData(user1.docs);
      if (location) {
        // const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
        // const url = `https://twitter.com/intent/tweet?text=${tweet}`;
        // Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(healthTipReferences)
    // console.log(userTableReference)
  }, []);
  return (
    <SafeAreaView>
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ fontSize: 20 }}>Hello {(user) ? <Text style={{ fontWeight: 'bold' }}>{user.user.name}</Text> : "null"}</Text>
        <Button title='Login' onPress={signIn} />
      </View>
      {(user) ? <View>
        <View>
          <Button title='update Location' onPress={updateLocation} />
          <Text>Latitude: {location ? location.coords.latitude : null}</Text>
          <Text>Longitude: {location ? location.coords.longitude : null}</Text>
        </View>

        <View>
          <Button title='Get All Location' onPress={getAllLocation} />
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return <View style={{ padding: 10, margin: 5, borderWidth: 1, borderColor: 'black' }}>
                <Text>email : {item.email}</Text>
                <Text>latitude:{item.data.latitude}</Text>
                <Text>longtitude:{item.data.longtitude}</Text>
                <Text>Distance: {getDistance({ latitude: location.coords.latitude, longitude: location.coords.longitude },
                  { latitude: item.data.latitude, longitude: item.data.longtitude })}</Text>
              </View>
            }}
            keyExtractor={(item) => `${item.email}`}
          />
        </View>
      </View> : null}
    </SafeAreaView>
  );
};

export default App;
