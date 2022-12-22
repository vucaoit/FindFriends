import { Buffer } from 'buffer';

function toObject<T>(encoded: string): T {
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const result: T = JSON.parse(decoded) as T;
    return result;
}

function toBase64(data: any): string {
    let json = JSON.stringify(data);
    let encoded = Buffer.from(json, 'utf-8').toString('base64');
    return encoded;
}

export const base64 = {

    toBase64<T>(object: T): string {
        return toBase64(object);
    },

    toObject<T>(encoded: string): T {
        return toObject(encoded);
    },

    toBase64String(data: string): string {
        return Buffer.from(data, 'utf-8').toString('base64');
    },
};
