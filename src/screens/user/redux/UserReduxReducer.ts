import { UserModel } from './../../../services/user/UserModel';
import { User } from "@react-native-google-signin/google-signin";
import { UserActionType } from "./UserReduxType";

interface UserReduxState {
    user: UserModel
}
const initState: UserReduxState = {
    user: {}
};
export const UserReducer = (state = initState, action: UserActionType): UserReduxState => {

    switch (action.type) {
        case 'UPDATE_USER_ACTION_TYPE':
            console.log('asdasdasdasd')
            state.user = action.payload
            return { ...state }
        default:
            console.log('ahihi')    
            return { ...state };
    }
};