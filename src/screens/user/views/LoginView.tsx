import { GoogleSigninButton, User } from "@react-native-google-signin/google-signin"
import React, { useState } from "react"
import { Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../generals/firebase/user";
import { updateUserActionRedux } from "../redux/UserReduxAction";
import { selectUsersRedux } from "../redux/UserReduxSelector";
interface LoginviewProps {
    user: User
}
const Loginview = (props: LoginviewProps) => {
    const [isSigninInProgress, setIsSigninInProgress] = useState(false);
    const dispatch = useDispatch();
    return <View style={{ alignItems: 'center' }}>
        <Text>
            <GoogleSigninButton
                style={{ width: 250, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => {
                    setIsSigninInProgress(true)
                    signIn().then(user => {
                        if (user) {
                            dispatch(updateUserActionRedux(user))
                            setIsSigninInProgress(false)
                        }
                    }).finally(() => {
                        setIsSigninInProgress(true)
                    })
                }}
                disabled={isSigninInProgress}
            />
        </Text>
    </View>
}
export default Loginview;