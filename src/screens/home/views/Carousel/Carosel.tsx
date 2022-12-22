import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { defaultWidth } from '../../../../generals/const/DefaultConst';
import CarouselItem from './CarouselItem';

const scrollX = new Animated.Value(0);
const position = Animated.divide(scrollX, defaultWidth);

const Carosel = ({ Data }: any) => {
    return (
        <View >
            <Animated.FlatList data={Data}
                keyExtractor={(item, index) => 'key' + index}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment="center"
                scrollEventThrottle={16}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <CarouselItem item={item} />;
                }}

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
            />
            <View style={styles.dotView}>
                {Data.map((_: any, i: any) => {
                    let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={i}
                            style={{
                                opacity,
                                height: 10,
                                width: 10,
                                backgroundColor: '#595959',
                                margin: 8,
                                borderRadius: 5,
                            }}
                        />
                    );
                })}

            </View>

        </View>
    );
};
export default Carosel;

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
});
