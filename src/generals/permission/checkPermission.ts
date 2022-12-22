import { UserModel, Location } from './../../services/user/UserModel';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Alert } from "react-native";

export const requestLocationPermission = async () => {
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
export const getLocation = (onUpdate?:(location:Location)=>void) => {
    const result = requestLocationPermission();
    let location = {latitude:0,longitude:0}
    result.then(res=>{
    if (res) {
        Geolocation.getCurrentPosition(
          (position:any) => {
           location =  {
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            }
            if(onUpdate){
              onUpdate(location)
            }
          },
          (error:any) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    })
  };