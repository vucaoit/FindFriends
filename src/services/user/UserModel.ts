import { User } from '@react-native-google-signin/google-signin';
export interface UserModel {
    user: User | null,
    gender: number | null,
    location: Location | null,
    name: string | null,
    photo: string | null,
}
export interface Location { latitude: number, longitude: number }
export interface PersonModel {
    email: string | null,
    gender: number | null,
    location: Location | null,
    name: string | null,
    photo: string | null,
}