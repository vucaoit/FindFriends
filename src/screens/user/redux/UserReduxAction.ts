import { UserModel } from './../../../services/user/UserModel';
import { User } from "@react-native-google-signin/google-signin";
import { UpdateUserActionType, UPDATE_USER_ACTION_TYPE } from "./UserReduxType";

export const updateUserActionRedux = (payload: UserModel): UpdateUserActionType => ({
    type: UPDATE_USER_ACTION_TYPE,
    payload: payload
})