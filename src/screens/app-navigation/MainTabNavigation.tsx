import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorAssets } from '../../assets/colors/ColorAssets';
import { IconView } from '../../generals/components/Icon/IconView';
import { logInfo } from '../../generals/utils/Logger';
import { productApi } from '../../services/product/ProductApi';
import { FindScreen } from '../find';
import { HomeScreen } from '../home/views';
import { NotificationScreen } from '../notification';
import { UserScreen } from '../user';
const Tab = createBottomTabNavigator();

export type MainTabNavigationType = 'Home' | 'Find' | 'User' | 'Notification';

export const MainTabNavigation = ({ navigation, route }: { route: any, navigation: any }) => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colorAssets.colors.malachiteGreen
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <IconView
                            name="chatbubbles-outline"
                            color={color}
                            size={size}
                            font={'IonIcons'}
                        />;
                    }
                }}
            />

            <Tab.Screen
                name="Find"
                component={FindScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <IconView
                            name="earth"
                            color={color}
                            size={size}
                            font={'IonIcons'}
                        />;
                    }
                }}
            />

            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <IconView
                            name="bell"
                            color={color}
                            size={size}
                            font={'FontAwesome5'}
                        />;
                    }
                }}
            />

            <Tab.Screen
                name="User"
                component={UserScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <IconView
                            name="user"
                            color={color}
                            size={size}
                            font={'FontAwesome5'}
                        />;
                    }
                }}
            />

        </Tab.Navigator>
    );
};
