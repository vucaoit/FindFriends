import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { reducers, RootState } from './RootState';
import logger from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

const persistConfig = {
    key: 'root',
    version: 0,
    storage: AsyncStorage,
    blacklist: [],
    whitelist: ['Root'],
    stateReconciler: autoMergeLevel2,
};

const finalReducer = persistReducer<RootState, any>(persistConfig, reducers);

const epic = combineEpics();

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: finalReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // immutableCheck: false,
            serializableCheck: false
        }).concat(logger).concat(epicMiddleware)
});

epicMiddleware.run(epic);

export const persistor = persistStore(store);
