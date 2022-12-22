import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, Alert, FlatList } from 'react-native';
import { defaultWidth } from '../../../../generals/const/DefaultConst';

export const TopBuySectionView = () => {
    return (
        <View style={{ flex: 1, marginHorizontal: 8, marginVertical: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sản phẩm bán chạy</Text>
                <Pressable onPress={() => Alert.alert('Xem thêm')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#808cff' }}>Xem thêm </Text>
                        <Image style={{ height: 12, width: 12 }} source={require('../../../../assets/IMG/icon-next.png')} />
                    </View>
                </Pressable>
            </View>

        </View>
    );
};

const Item = ({ id, name, uri }: any) => (
    <Pressable style={{ flexBasis: '50%', justifyContent: 'center', alignItems: 'center', marginHorizontal: 8, flexGrow: 0, flexShrink: 1 }} onPress={() => {
        console.log(id);
        Alert.alert('Click: ', id.toString());
    }}>
        <View style={styles.item}>

            <View style={{ flex: 3 }}>
                <Image
                    source={{ uri: uri }}
                    style={styles.image}
                />
            </View>
            <View style={styles.textTitle}>
                <Text>{id}</Text>
            </View>
        </View>
    </Pressable>
);

export const renderItemTopBuy = ({ item }: any) => (

    <Item id={item.id} name={item.title} uri={item.url} />
);

const styles = StyleSheet.create({
    item: {
        height: 200,
        width: defaultWidth * 0.42,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'space-between',
        marginTop: 10,
        borderRadius: 12,
    },
    image: {
        flex: 1,
        width: 155,
        height: 95,
        resizeMode: 'cover',
        borderRadius: 12,
    },
    textTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
