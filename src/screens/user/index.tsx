import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUsersRedux } from './redux/UserReduxSelector';
import Loginview from './views/LoginView';
import Profileview from './views/ProfileView';

export const UserScreen = ({ navigation, route }: { route: any, navigation: any }) => {
    const user = useSelector(selectUsersRedux);
    return <View
        style={{
            flex: 1,
        }}
    >
        <ImageBackground style={{ flex: 1, justifyContent: 'center' }} resizeMode="cover" source={require("../../assets/IMG/bg.jpg")}>
            {(!user.user) ? <Loginview user={user!} /> : <Profileview user={user} />}
        </ImageBackground>
    </View>
};

