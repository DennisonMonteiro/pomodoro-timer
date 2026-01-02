import { createStackNavigator } from "@react-navigation/stack";
import { HomePage } from "./pages/HomePage";
import { Settings } from "./pages/Settings";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";

type TScreenDefinitions = {
    Home: undefined;
    Settings: undefined;
}

const Stack = createStackNavigator<TScreenDefinitions>();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TNavigationScreenProps = NavigationProp<TScreenDefinitions>