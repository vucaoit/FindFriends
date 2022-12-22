import { User } from "@react-native-google-signin/google-signin";

export const UPDATE_USER_ACTION_TYPE = 'UPDATE_USER_ACTION_TYPE';


export type UpdateUserActionType = {
    type: typeof UPDATE_USER_ACTION_TYPE,
    payload: User
}
export type UserActionType = UpdateUserActionType;