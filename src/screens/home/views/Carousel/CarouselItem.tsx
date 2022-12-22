import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';
import { defaultWidth, defaultHeight } from '../../../../generals/const/DefaultConst';


const CarouselItem = ({ item }: any) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item.url }} />
        </View>
    );
};

const styles = StyleSheet.create({
    cardView: {
        width: defaultWidth - 16,
        height: defaultHeight / 4,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: defaultWidth - 16,
        height: defaultHeight / 4,
        alignSelf: 'center',
        resizeMode: 'cover',
        borderRadius: 10,
    },

});

export default CarouselItem;
