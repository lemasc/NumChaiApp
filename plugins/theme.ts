import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  configureFonts,
} from "react-native-paper";
import merge from "deepmerge";

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const navigationTheme = merge(MD3LightTheme, LightTheme);

const theme = merge(navigationTheme, {
  fonts: configureFonts({
    config: {
      default: {
        fontFamily: "Athiti_400Regular",
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 1.5,
      },
    },
  }),
});

export { theme };
