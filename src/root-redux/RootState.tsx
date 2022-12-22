import { combineReducers } from 'redux';
import { appReducer } from '../screens/app-redux/AppReducer';
import { UserReducer } from '../screens/user/redux/UserReduxReducer';


export interface RootState {
    appReducer: ReturnType<typeof appReducer>,
    userReducer: ReturnType<typeof UserReducer>
}

export const reducers = combineReducers({
    appReducer: appReducer,
    userReducer: UserReducer
});
