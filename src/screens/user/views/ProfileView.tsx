import { User } from "@react-native-google-signin/google-signin"
import React from "react"
import { Button, Image, Pressable, Text, View } from "react-native"
import { signOut } from "../../../generals/firebase/userFirebase"
import { useDispatch } from "react-redux"
import { updateUserActionRedux } from "../redux/UserReduxAction"
import { UserModel } from "../../../services/user/UserModel"
interface ProfilerViewProps {
    user: UserModel
}
const Profileview = (props: ProfilerViewProps) => {
    const dispatch = useDispatch()
    return <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: props.user.user!.user.photo! }} />
            <Text>{props.user.user!.user.name}</Text>
            <Text>{props.user.user!.user.email}</Text>
        </View>
        <View style={{ height: 50, justifyContent: 'center' }}>
            <Pressable style={{ backgroundColor: '#0EBFE9', alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => signOut(() => dispatch(updateUserActionRedux({})))}>
                <Text style={{ color: 'white' }}>Logout</Text>
            </Pressable>
        </View>
    </View>
}
export default Profileview;