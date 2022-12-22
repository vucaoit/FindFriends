import { User } from "@react-native-google-signin/google-signin";
import { UserActionType } from "./UserReduxType";

interface CartReduxState {
    user: User
}
const initState: CartReduxState = {
    user: {
        user: {
            id: '',
            name: null,
            email: '',
            photo: null,
            familyName: null,
            givenName: null
        },
        idToken: null,
        /**
         * Not null only if a valid webClientId and offlineAccess: true was
         * specified in configure().
         */
        serverAuthCode: null
    }
};
export const UserReducer = (state = initState, action: UserActionType): CartReduxState => {

    switch (action.type) {
        case 'UPDATE_USER_ACTION_TYPE':
            state.user = action.payload
            return { ...state }
        default: return { ...state };
    }
};