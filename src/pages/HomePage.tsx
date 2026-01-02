import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { TNavigationScreenProps } from "../AppRoutes";

export const HomePage = () => {
    const navigation = useNavigation<TNavigationScreenProps>();

    return(
        <View>
            <Text style={{ fontFamily: 'InterRegular', fontSize: 40 }}>
                Home Page!
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text>
                    Settings
                </Text>
            </TouchableOpacity>
        </View>
    )
}