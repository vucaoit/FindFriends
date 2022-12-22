import { UserModel } from './../../../services/user/UserModel';
import { User } from "@react-native-google-signin/google-signin";

export const UPDATE_USER_ACTION_TYPE = 'UPDATE_USER_ACTION_TYPE';


export type UpdateUserActionType = {
    type: typeof UPDATE_USER_ACTION_TYPE,
    payload: UserModel
}
export type UserActionType = UpdateUserActionType;