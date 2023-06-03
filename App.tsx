import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/HomeScreen";
import { RootStackParamList } from "./types/navigation";
import { theme } from "./plugins/theme";
import { SWRConfig } from "swr";
import { swrConfig } from "./plugins/swr";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SWRConfig value={swrConfig}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home", headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SWRConfig>
  );
}
