import { EdgeInsets } from 'react-native-safe-area-context';
import { RootState } from '../../root-redux/RootState';
import { AppActionType, AppUpdateInsetsAction, APP_EMPTY_ACTION, APP_UPDATE_INSETS_ACTION } from './AppType';

export const appEmptyAction = (): AppActionType => ({
    type: APP_EMPTY_ACTION
});

export const appUpdateInsetsAction = (payload: EdgeInsets | null): AppUpdateInsetsAction => ({
    type: APP_UPDATE_INSETS_ACTION,
    payload: payload
});

/// selector

export const selectAppEdgeInsets = (state: RootState) => state.appReducer.insets;
