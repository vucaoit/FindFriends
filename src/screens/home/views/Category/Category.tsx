import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Alert, FlatList, TouchableOpacity } from 'react-native';
import { CategoryTemp } from '..';
import { logInfo } from './../../../../generals/utils/Logger';

interface CategoryTemp2D {
    category: CategoryTemp[]
}

export const Category = ({ data }: { data: CategoryTemp[] }) => {

    const [converted, setConverted] = useState<CategoryTemp2D[]>();

    const map = useCallback(() => {
        let temps: CategoryTemp2D[] = [];
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            if (temps[index] === undefined) {
                temps[index] = { category: [] };
            }

            temps[index].category.push(data[i]);

            if (i % 2 !== 0) {
                index += 1;
            }
        }

        logInfo(temps);

        setConverted(temps);
    }, [data]);

    useEffect(() => {
        if (converted === undefined) {
            map();
        }
    }, [converted, map]);


    const renderItem = ({ item }: { item: CategoryTemp2D }) => (
        <Item2D item={item} />
    );


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                horizontal={true}
                data={converted}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                    flexDirection: 'row',
                }}
            />

        </View>
    );
};

const Item2D = ({ item }: { item: CategoryTemp2D }) => {
    return (
        <View style={{ marginHorizontal: 5 }}>

            {
                item.category[0] !== undefined ? <Item item={item.category[0]} /> : null
            }

            {
                item.category[1] !== undefined ? <Item item={item.category[1]} /> : null
            }

        </View>
    );
};

const Item = ({ item }: { item: CategoryTemp }) => {
    return (
        <View style={styles.container}>

            <View style={{ flex: 3 }}>
                <Image
                    source={{ uri: item.url }}
                    style={styles.image}
                />
            </View>
            <View style={styles.textTitle}>
                <Text>{item.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'space-between',
        marginVertical: 8,
        borderRadius: 12,
    },
    image: {
        flex: 1,
        width: 98,
        height: 95,
        resizeMode: 'cover',
        borderRadius: 12,
    },
    textTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
