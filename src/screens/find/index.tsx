import React from 'react';
import { Text, View } from 'react-native';

export const FindScreen = ({ navigation, route }: { route: any, navigation: any }) => {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>
                Cart
            </Text>
        </View>
    );
};

