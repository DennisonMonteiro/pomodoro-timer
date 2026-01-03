import { createStackNavigator } from "@react-navigation/stack";
import { HomePage } from "./pages/HomePage";
import { Settings } from "./pages/Settings";
import { NavigationContainer, NavigationProp, DefaultTheme } from "@react-navigation/native";
import { Theme } from "./shared/themes/theme";

type TScreenDefinitions = {
    Home: undefined;
    Settings: undefined;
}

const Stack = createStackNavigator<TScreenDefinitions>();

export function AppRoutes() {
  return (
    <NavigationContainer 
      theme=
      {{
        ...DefaultTheme,
        fonts: {
          ...DefaultTheme.fonts,
          bold: {
            fontFamily: Theme.fonts.interBold,
            fontWeight: '700'
          },
          regular: {
            fontFamily: Theme.fonts.interRegular,
            fontWeight: '500'
          }
        },
        colors: {
          ...DefaultTheme.colors,
          background: Theme.colors.background,
          primary: Theme.colors.primary,
          text: Theme.colors.text,
        },
      }}
    >
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TNavigationScreenProps = NavigationProp<TScreenDefinitions>