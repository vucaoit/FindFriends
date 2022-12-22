import { User } from "@react-native-google-signin/google-signin"
import React from "react"
import { Image, Text, View } from "react-native"
interface ProfilerViewProps {
    user: User
}
const Profileview = (props: ProfilerViewProps) => {
    return <View>
        <View style={{ alignItems: 'center' }}>
            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: props.user.user.photo! }} />
            <Text>{props.user.user.name}</Text>
            <Text>{props.user.user.email}</Text>
        </View>
    </View>
}
export default Profileview;