import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/HomeScreen";
import { RootStackParamList } from "./types/navigation";
import AddScreen from "./pages/AddScreen";
import ViewScreen from "./pages/ViewScreen";
import { theme } from "./plugins/theme";
import { SWRConfig } from "swr";
import { swrConfig } from "./plugins/swr";
import EditScreen from "./pages/EditScreen";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Athiti_200ExtraLight,
  Athiti_300Light,
  Athiti_400Regular,
  Athiti_500Medium,
  Athiti_600SemiBold,
  Athiti_700Bold,
} from "@expo-google-fonts/athiti";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Athiti_200ExtraLight,
    Athiti_300Light,
    Athiti_400Regular,
    Athiti_500Medium,
    Athiti_600SemiBold,
    Athiti_700Bold,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <SWRConfig value={swrConfig}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home", headerBackButtonMenuEnabled: false }}
            />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              options={{ title: "Add" }}
            />
            <Stack.Screen
              name="Edit"
              component={EditScreen}
              options={{ title: "Edit" }}
            />
            <Stack.Screen
              name="View"
              component={ViewScreen}
              options={{ title: "View" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SWRConfig>
  );
}
