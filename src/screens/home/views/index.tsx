import React from 'react';
import { ScrollView, Text, View, Image, Pressable, Alert, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Carosel from './Carousel/Carosel';
import { Category } from './Category/Category';
import HomeHeader from './HomeHeader';
import { renderItemTopBuy, TopBuySectionView } from './TopBuy/TopBuy';

export interface CategoryTemp {
    title: string
    url: string
    id: number
}

const dumyData = [
    {
        title: 'Anise Aroma Art Bazar', url: 'https://shopdunk.com/wp-content/uploads/2021/07/SEA_iPhone_11_B_3_3_11zon-692x692.webp?crop=1',
        description: 'Lorem IPsum is simply dummy text of the printing and typesettting industry.',
        id: 1,
    },
    {
        title: 'Food inside a Bowl', url: 'https://shopdunk.com/wp-content/uploads/2021/07/SEA_iPhone_11_B_4_4_11zon-692x692.webp?crop=1',
        description: 'Lorem IPsum is simply dummy text of the printing and typesettting industry.',
        id: 2,
    },
    {
        title: 'Vegetable Sald', url: 'http://192.168.115.132:3000/api/category/image/1/687f3967b7c2fe6a134a2c11894eea4b.png',
        description: 'Lorem IPsum is simply dummy text of the printing and typesettting industry.',
        id: 3,
    },
    {
        title: 'Vegetable Sald', url: 'https://shopdunk.com/wp-content/uploads/2021/07/SEA_iPhone_11_B_7_5_11zon-692x692.webp?crop=1',
        description: 'Lorem IPsum is simply dummy text of the printing and typesettting industry.',
        id: 4,
    },
    {
        title: 'Anise Aroma Art Bazar', url: 'https://aphoto.vn/wp-content/uploads/2016/07/cach-chup-hinh-dep-bang-dien-thoai.jpg',
        description: 'Lorem IPsum is simply dummy text of the printing and typesettting industry.',
        id: 5,
    },
    {
        title: 'Food inside a Bowl', url: 'https://aphoto.vn/wp-content/uploads/2019/04/aphoto.jpg',
        description: 'Lorem IPsum is simply dummy text of the printing and typesettting industry.',
        id: 6,
    },
    {
        title: 'Vegetable Sald', url: 'https://phunugioi.com/wp-content/uploads/2020/02/anh-phong-canh-hung-vy-nui-va-song.jpg',
        description: 'Lorem IPsum is simply dummy text of the printing and typesettting industry.',
        id: 7,
    },
    // {
    //     title: 'Vegetable Sald', url: 'https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg',
    //     description: 'Lorem IPsum is simply dummy text of the printing and typesettting industry.',
    //     id: 8,
    // },
];


export const HomeScreen = ({ navigation, route }: { route: any, navigation: any }) => {

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <View style={{ flex: 1 }} >
                            <HomeHeader />
                            <Carosel Data={dumyData} />
                            <CategorySectionView />
                            <TopBuySectionView />
                        </View>
                    );
                }
                }
                numColumns={2}
                data={dumyData}
                renderItem={renderItemTopBuy}
                keyExtractor={(item: any) => item.id}

            />

        </SafeAreaView>
    );
};

export const CategorySectionView = () => {

    return (
        <View style={{ marginHorizontal: 16, flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Danh mục sản phẩm</Text>
            <Category data={dumyData} />
        </View>
    );
};
