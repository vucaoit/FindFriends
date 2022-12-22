import { User } from '@react-native-google-signin/google-signin';
export interface UserModel{
    user?:User,
    gender?:number,
    location?:Location,
    name?:string,
    photo?:string,
}
export interface Location{latitude: number, longitude: number}
export interface PersonModel {
    email:string,
    gender?:number,
    location?:Location,
    name?:string,
    photo?:string,
}