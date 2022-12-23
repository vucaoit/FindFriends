import { User } from "@react-native-google-signin/google-signin"
import React from "react"
import { Button, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { signOut } from "../../../generals/firebase/userFirebase"
import { useDispatch } from "react-redux"
import { updateUserActionRedux } from "../redux/UserReduxAction"
import { UserModel } from "../../../services/user/UserModel"
import { Dive } from "../../../generals/components/Dive"
import { SwitchApp } from "../components/Swtitch"
interface ProfilerViewProps {
    user: UserModel
}
const Profileview = (props: ProfilerViewProps) => {
    const borderValue = 40
    const dispatch = useDispatch()
    return <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {(props.user.user !== null && props.user.photo) ?
                        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: props.user.photo }} />
                            <Text style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>{props.user.user!.user.name}</Text>
                            <Text style={{ color: 'white' }}>{props.user.user!.user.email}</Text>
                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                <Text style={{ color: 'white' }}>Following: <Text style={{ fontWeight: 'bold' }}>{20}</Text></Text>
                                <View style={{ borderRightWidth: 1, borderRightColor: '#eeeeee', marginHorizontal: 10 }}></View>
                                <Text style={{ color: 'white' }}>Follower: <Text style={{ fontWeight: 'bold' }}>{300}</Text></Text>
                            </View>
                        </View>
                        :
                        <></>}
                </View>
                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderTopLeftRadius: borderValue, borderTopRightRadius: borderValue, height: 200 }}>
                    <View style={{}}>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 10, paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>Lời chào</Text>
                            <Text
                                style={{ borderWidth: 1, borderRadius: 5, paddingHorizontal: 16, textAlignVertical: 'center', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                            >
                                Chào các bạn đã ghé thăm trang cá nhân của mình
                            </Text>
                        </View>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Ẩn Trạng thái hoạt động</Text>
                                <SwitchApp />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: 50, justifyContent: 'center' }}>
                    <Pressable style={{ backgroundColor: 'rgba(87, 138, 255, 0.5)', alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => signOut(() => dispatch(updateUserActionRedux({
                        user: null,
                        gender: null,
                        location: null,
                        name: null,
                        photo: null
                    })))}>
                        <Text style={{ color: 'white' }}>Logout</Text>
                    </Pressable>
                </View>
            </View>


        </ScrollView>
    </View>
}
export default Profileview;