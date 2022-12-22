import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { reducers, RootState } from './RootState';
import logger from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

const persistConfig: PersistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: [],
    whitelist: ['root']
};

const finalReducer = persistReducer<RootState, any>(persistConfig, reducers);

const epic = combineEpics();

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: finalReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
            // .concat(logger)
            .concat(epicMiddleware)
});

epicMiddleware.run(epic);

export const persistor = persistStore(store);
