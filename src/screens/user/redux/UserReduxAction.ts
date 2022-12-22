import { User } from "@react-native-google-signin/google-signin";
import { UpdateUserActionType, UPDATE_USER_ACTION_TYPE } from "./UserReduxType";

export const updateUserActionRedux = (payload: User): UpdateUserActionType => ({
    type: UPDATE_USER_ACTION_TYPE,
    payload: payload
})