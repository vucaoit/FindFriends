import React, { useImperativeHandle, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { defaultIconSize } from '../../const/DefaultConst';

import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
// import CustomFont from '../CustomFonts/CustomFont';

export type AllowedIconFont = 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Fontisto' | 'Foundation' | 'IonIcons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial' | 'CustomIcon';

interface BaseIconProps {
    name: string,
    size?: number,
    color?: string | null,
    font?: AllowedIconFont,
    style?: StyleProp<ViewStyle> | null,
}

const Icon = ({ font, size, name, color }: BaseIconProps) => {
    switch (font) {
        case 'AntDesign': return <AntDesign name={name} size={size} color={color} />;
        case 'Entypo': return <EntypoIcon name={name} size={size} color={color} />;
        case 'EvilIcons': return <EvilIcons name={name} size={size} color={color} />;
        case 'Feather': return <Feather name={name} size={size} color={color} />;
        case 'FontAwesome': return <IconAwesome name={name} size={size} color={color} />;
        case 'FontAwesome5': return <IconAwesome5 name={name} size={size} color={color} />;
        case 'Fontisto': return <Fontisto name={name} size={size} color={color} />;
        case 'Foundation': return <Foundation name={name} size={size} color={color} />;
        case 'IonIcons': return <IonIcon name={name} size={size} color={color} />;
        case 'MaterialCommunityIcons': return <MaterialCommunityIcon name={name} size={size} color={color} />;
        case 'MaterialIcons': return <MaterialIcons name={name} size={size} color={color} />;
        case 'Octicons': return <Octicons name={name} size={size} color={color} />;
        case 'SimpleLineIcons': return <SimpleLineIcons name={name} size={size} color={color} />;
        case 'Zocial': return <Zocial name={name} size={size} color={color} />;
        default: return <IonIcon name={name} size={size} color={color} />;
    }
};

/**
 *  - Props:
 *      + name: string, require
 *      + size: number, default: 24
 *      + color: string, default: black
 *      + font: AllowedIconFont, default: Ion icon
 *      + style: container style, 
 */
export const IconView = ({ size = defaultIconSize, name, color = '#000', font = 'IonIcons', style }: BaseIconProps) => {
    return (
        <View style={style}>
            <Icon name={name} size={size} color={color} font={font} />
        </View>
    );
};


interface IconButtonProps {
    action: () => void
    pressedContainerStyle?: StyleProp<ViewStyle> | null
}

/**
 *  - Props:
 *      + name: string, require
 *      + size: number, default: 24
 *      + color: string, default: black
 *      + font: AllowedIconFont, default: Ion icon
 *      + style: container style, 
 *      + pressedContainerStyle: style when press button
 */
export const IconButton = ({
    action,
    size = defaultIconSize,
    name,
    color = '#000',
    style = {},
    font = 'IonIcons',
    pressedContainerStyle
}: BaseIconProps & IconButtonProps) => {

    const [onPressed, setOnPressed] = useState(false);

    return (
        <Pressable
            onPress={action}
            style={onPressed ? pressedContainerStyle : style}
            onPressIn={e => {
                if (pressedContainerStyle) {
                    setOnPressed(true);
                }
            }}
            onPressOut={e => {
                if (pressedContainerStyle) {
                    setOnPressed(false);
                }
            }}
        >
            <Icon name={name} size={size} color={color} font={font} />
        </Pressable>
    );
};


export const IconButtonRef = React.forwardRef((props: IconButtonProps & BaseIconProps, ref) => {

    const { action, name, size = defaultIconSize, color = '#000', style = {}, font = 'IonIcons' } = props;

    const [_name, setName] = useState(name);

    useImperativeHandle(ref, () => ({
        setName: (fontName: string) => { setName(fontName); }
    }), []);

    return (
        <Pressable
            onPress={action}
            style={style}
        >
            <Icon name={name} size={size} color={color} font={font} />
        </Pressable>
    );
});

// export const CustomIconView = ({ size, name, color, style }: {
//     size?: number,
//     color?: string | null,
//     name: string,
//     style?: StyleProp<ViewStyle>,
// }) => (
//     <CustomIcon
//         name={name}
//         size={size}
//         color={color}
//         style={style}
//     />
// );
