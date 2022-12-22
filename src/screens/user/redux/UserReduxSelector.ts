import { UserModel } from './../../../services/user/UserModel';
import { User } from "@react-native-google-signin/google-signin";
import { RootState } from "../../../root-redux/RootState";

export const selectUsersRedux = (state: RootState) => {
    let temps: UserModel = state.userReducer.user;
    return temps;
};