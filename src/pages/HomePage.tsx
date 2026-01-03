import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from "../shared/themes/theme";

export const HomePage = () => {
    const navigation = useNavigation<TNavigationScreenProps>();

    return(
        <View>
            <Text style={{ fontFamily: 'InterRegular', fontSize: 40, color: Theme.colors.text }}>
                Home Page!
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text style={{ color: Theme.colors.text }}>
                    Settings
                </Text>
            </TouchableOpacity>
        </View>
    )
}