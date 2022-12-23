import { getLocation } from './../permission/checkPermission';
import { PersonModel, UserModel, Location } from './../../services/user/UserModel';
import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

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
export const scanner = async (user: UserModel, onUpdate?: (user: UserModel) => void): Promise<PersonModel[] | null> => {
  try {
    getLocation((location => {
      if (user.user) {
        user = { ...user, location: (location ? location : null) }
        updateFieldByEmail(user.user!.user.email, {
          location: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        });
        if (onUpdate) onUpdate(user)
      }
    }))
    let persons: PersonModel[] = [];
    const info = await firestore().collection('users').get();
    info.forEach(person => {
      let item = person.data() as PersonModel;
      persons.push(item)
    })
    return persons
  } catch (error) {
    console.log(error);
  }
  return null
};
export const isSignedIn = async (): Promise<boolean> => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  return isSignedIn
};
export const getCurrentUser = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  if (isSignedIn) {
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser) {
      const info = await getInfoByEmail(currentUser.user.email)
      if (!info) {
        updateUserByUserModel({
          user: currentUser,
          name: currentUser.user.name,
          gender: 0,
          location: null,
          photo: currentUser.user.photo
        })
      }
    }
  }

};
export const signIn = async (): Promise<UserModel | null> => {
  try {
    const checkService = await GoogleSignin.hasPlayServices();
    if (checkService) {
      const userInfo = await GoogleSignin.signIn();
      const accountHasInfo = await getInfoByEmail(userInfo.user.email)
      if (!accountHasInfo) {
        const newInfo: UserModel = {
          user: userInfo,
          photo: userInfo.user.photo,
          name: userInfo.user.name,
          gender: null,
          location: null
        }
        updateUserByUserModel(newInfo)
        return newInfo
      } else {
        const newInfo: UserModel = {
          user: userInfo,
          gender: accountHasInfo.gender,
          location: accountHasInfo.location,
          name: accountHasInfo.name,
          photo: accountHasInfo.photo
        }
        return newInfo
      }
    }
    return null
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
    return null
  }
};
export const getInfoByEmail = async (email: string): Promise<PersonModel | null> => {
  const info = await firestore().collection('users').doc(email).get();
  if (info.data()) {
    return info.data() as PersonModel
  }
  return null
}
export const updateUserByUserModel = async (user: UserModel) => {
  try {
    await firestore()
      .collection('users')
      .doc(user.user!.user.email)
      .set({
        email: user.user?.user.email,
        gender: user.gender,
        location: user.location,
        name: user.name,
        photo: user.photo,
      })
      .then(() => {
        console.log("Thong bao Cap nhat thong tin thanh cong!");
      }).catch((er) => {
        console.log(er);
      });
  }
  catch (erro: any) {
    console.log(erro)
  }
}
export const updateFieldByEmail = (email: string, data: any) => {
  try {
    firestore()
      .collection('users')
      .doc(email)
      .update(
        data)
      .then(() => {
        console.log('User updated!');
      });
  }
  catch (error: any) {
    console.log(error)
  }
}
const revokeAccess = async () => {
  try {
    await GoogleSignin.revokeAccess();
    // Google Account disconnected from your app.
    // Perform clean-up actions, such as deleting data associated with the disconnected account.
  } catch (error) {
    console.error(error);
  }
};
export const signOut = async (onSignOut: () => void) => {
  try {
    await GoogleSignin.signOut();
    // revokeAccess()
    onSignOut()
  } catch (error) {
    console.error(error);
  }
};