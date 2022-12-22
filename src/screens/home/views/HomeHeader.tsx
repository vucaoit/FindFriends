import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, Alert } from 'react-native';

const HomeHeader = (props: any) => {
    return (
        <View style={styles.container}>
            <Text>Hello {props.name}</Text>

            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Trang chủ</Text>

            <Pressable onPress={() => { Alert.alert('click search'); }} >
                <Image
                    style={styles.stretch}
                    source={require('../../../assets/IMG/icon-search.png')}
                />
            </Pressable>


        </View>
    );
};
export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 10,
    },
    stretch: {
        width: 16,
        height: 16,
        resizeMode: 'stretch',
    },
});
