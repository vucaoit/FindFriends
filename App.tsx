import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, SafeAreaView, Button, PermissionsAndroid, Alert, FlatList } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/root-redux/ReduxStore';
import { AppNavigation } from './src/screens/app-navigation';
import { isSignedIn } from './src/generals/firebase/userFirebase';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
