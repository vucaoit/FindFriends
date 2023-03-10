import { Image, Text, View } from "react-native"
import { Location, PersonModel } from "../../../services/user/UserModel"
import React from "react"
import { IconView } from "../../../generals/components/Icon/IconView"
import { useSelector } from "react-redux"
import { selectUsersRedux } from "../../user/redux/UserReduxSelector"
import { distanceToString } from "../../../generals/utils/functions"

interface PersonItemViewProps {
    person: PersonModel,
    myLocation: Location | null
}
export const PersonItemView = (props: PersonItemViewProps) => {
    const user = useSelector(selectUsersRedux);
    return <View style={{ flexDirection: 'row' }}>
        <View style={{}}>
            {props.person.photo ? <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{ uri: props.person.photo }} /> : <IconView name={"person-circle-outline"} font='IonIcons' size={50} />}
        </View>
        <View>
            <Text>{props.person.email}</Text>
            <Text>{distanceToString(props.myLocation ? props.myLocation : { latitude: 0, longitude: 0 }, props.person.location!)}</Text>
        </View>
    </View>
}