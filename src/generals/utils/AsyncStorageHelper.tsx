import AsyncStorage from '@react-native-async-storage/async-storage';
import { logInfo } from './Logger';

class AsyncStorageHelper {

    static readonly instance: AsyncStorageHelper = new AsyncStorageHelper();

    async save(key: string, value: any) {
        try {
            let json = JSON.stringify(value);
            await AsyncStorage.setItem(key, json);
        } catch (e) {
            logInfo(e);
        }
    }

    async remove(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            logInfo(e);
        }
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            let json = await AsyncStorage.getItem(key);
            if (json) {
                return JSON.parse(json);
            }
            return null;
        } catch (e) {
            logInfo(e);
            return null;
        }
    }
}

export const asyncStorage = {
    save: async (key: string, value: any) => {
        await AsyncStorageHelper.instance.save(key, value);
    },

    remove: async (key: string) => {
        await AsyncStorageHelper.instance.remove(key);
    },

    async get<T>(key: string): Promise<T | null | undefined> {
        return await AsyncStorageHelper.instance.get(key);
    }
};
