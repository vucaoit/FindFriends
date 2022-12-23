import React, { useState } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { Location, PersonModel, UserModel } from '../../services/user/UserModel';
import { scanner, updateFieldByEmail } from '../../generals/firebase/userFirebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsersRedux } from '../user/redux/UserReduxSelector';
import { updateUserActionRedux } from '../user/redux/UserReduxAction';
import { FlatList } from 'react-native-gesture-handler';
import { PersonItemView } from './components/PersonItemView';
import { getLocation } from '../../generals/permission/checkPermission';


export const FindScreen = ({ navigation, route }: { route: any, navigation: any }) => {
    const user = useSelector(selectUsersRedux);
    const dispatch = useDispatch()
    const [data, setData] = useState<PersonModel[]>()
    const [loading, setLoading] = useState(false)
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Pressable style={{ width: '100%', backgroundColor: "#0EBFE9", height: 50, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        getLocation((location: Location) => {
                            if (user.user) {
                                user.location = location
                                updateFieldByEmail(user.user.user.email, {
                                    location: location
                                })
                            }
                        })
                        setLoading(true);
                        let temp = scanner(user, (user: UserModel) => dispatch(updateUserActionRedux(user)));
                        temp.then(dat => {
                            if (dat) {
                                setData(dat)
                            }
                        })
                        setLoading(false)
                    }} >
                    <Text style={{ color: 'white' }}>Scan</Text>
                </Pressable>
            </View>
            <View style={{ flex: 1 }}>
                {loading ? <Text style={{ fontSize: 20 }}>Loading...</Text>
                    :
                    <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            return <PersonItemView person={item} myLocation={user.location} />
                        }
                        }
                        keyExtractor={(item, index) => `${item.email ? item.email : index}`}
                    />}
            </View>
        </View>
    );
};

