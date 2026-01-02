import { createStackNavigator } from "@react-navigation/stack";
import { HomePage } from "./pages/HomePage";
import { Settings } from "./pages/Settings";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

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
