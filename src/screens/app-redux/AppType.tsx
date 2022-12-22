import { EdgeInsets } from 'react-native-safe-area-context';

export const APP_EMPTY_ACTION = 'APP_EMPTY_ACTION';

export const APP_UPDATE_INSETS_ACTION = 'APP_UPDATE_INSETS_ACTION';

export type AppEmptyAction = {
    type: typeof APP_EMPTY_ACTION
}

export type AppUpdateInsetsAction = {
    type: typeof APP_UPDATE_INSETS_ACTION
    payload: EdgeInsets | null
}

export type AppActionType = AppEmptyAction | AppUpdateInsetsAction;
