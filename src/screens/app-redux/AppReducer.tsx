import { EdgeInsets } from 'react-native-safe-area-context';
import { AppActionType } from './AppType';

export interface AppState {
    insets: EdgeInsets | null
}

const initialAppState: AppState = {
    insets: null
};

export const appReducer = (state = initialAppState, action: AppActionType): AppState => {
    switch (action.type) {
        case 'APP_UPDATE_INSETS_ACTION':
            state.insets = action.payload;
            return { ...state };

        default: return state;
    }
};
