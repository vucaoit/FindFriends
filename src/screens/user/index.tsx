import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUsersRedux } from './redux/UserReduxSelector';
import Loginview from './views/LoginView';
import Profileview from './views/ProfileView';

export const UserScreen = ({ navigation, route }: { route: any, navigation: any }) => {
    const user = useSelector(selectUsersRedux);
    return <View
        style={{
            flex: 1
        }}
    >
        {(!user.user) ? <Loginview user={user!} /> : <Profileview user={user} />}
    </View>
};

