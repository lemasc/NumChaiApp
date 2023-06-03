import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/HomeScreen";
import { RootStackParamList } from "./types/navigation";
import AddScreen from "./pages/AddScreen";
import ViewScreen from "./pages/ViewScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{ title: "Add" }}
        />
        <Stack.Screen
          name="View"
          component={ViewScreen}
          options={{ title: "View" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
